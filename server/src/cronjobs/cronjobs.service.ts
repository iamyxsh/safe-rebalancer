import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { RebalancingData } from 'src/schemas';
import { abi as V3Abi } from '@chainlink/abi/v0.7/interfaces/AggregatorV3Interface.json';
import { abi as moduleAbi } from '../data/module.json';
import { ethers } from 'ethers';
import { AggregatorV3Address, REBALANCER_MODULE, RPC_URL } from 'src/constants';

@Injectable()
export class CronjobsService {
  provider: ethers.JsonRpcProvider;
  private priceFeed: ethers.Contract;
  private rebalancerModule: ethers.Contract;
  constructor(
    @InjectModel(RebalancingData.name)
    private dataModel: Model<RebalancingData>,
  ) {}

  onModuleInit() {
    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.priceFeed = new ethers.Contract(
      AggregatorV3Address,
      V3Abi,
      this.provider,
    );
    this.rebalancerModule = new ethers.Contract(
      REBALANCER_MODULE,
      moduleAbi,
      this.provider,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleRebalancing() {
    try {
      const data = await this.dataModel.find().then((res) => res[0]);

      const price = await this.priceFeed
        .latestRoundData()
        .then((res) => res[1]);
      console.log(data.amount, price);

      const signer = new ethers.Wallet(data.sessionKeyPK).connect(
        this.provider,
      );

      const rebalancer = new ethers.Contract(
        REBALANCER_MODULE,
        moduleAbi,
        signer,
      );

      const tx = await rebalancer.executeRebalance(data.address);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  }
}

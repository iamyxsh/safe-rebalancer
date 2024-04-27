import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRebalancingDataDTO } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { RebalancingData } from './schemas';
import { Model } from 'mongoose';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(RebalancingData.name)
    private dataModel: Model<RebalancingData>,
  ) {}

  pong(): string {
    return 'Playing Ping Pong!';
  }

  async storeRebalancingData(body: CreateRebalancingDataDTO) {
    try {
      const wallet = ethers.Wallet.createRandom();
      await this.dataModel.create({
        address: body.address,
        amount: body.amount,
        sessionKeyPK: wallet.privateKey,
        tokenA: body.tokenA,
        tokenB: body.tokenB,
      });
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRebalancingData(safeAddress: string) {
    try {
      const data = await this.dataModel.findOne({
        address: safeAddress,
      });
      if (!data) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      const pk = data.sessionKeyPK;
      delete data.sessionKeyPK;
      data.sessionKeyPK = new ethers.Wallet(pk).address;
      return data;
    } catch (err) {
      console.log(err.status);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

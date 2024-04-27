import { ethers } from 'ethers'
import { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import { abi as V3abi } from './data/aggregatorv3.json'
import {
  REBALANCER_MODULE,
  RPC_URL,
  SAFE_TXS_URL,
  USDC,
  WETH,
  OWNER_1_PRIVATE_KEY,
  OWNER_2_PRIVATE_KEY,
  AggregatorV3Address,
} from './constants'
import { abi as erc20Abi } from './data/erc20Abi.json'
import { abi as moduleAbi } from './data/moduleAbi.json'

export async function setup() {
  const provider = new ethers.JsonRpcProvider(RPC_URL)
  const owner1Signer = new ethers.Wallet(OWNER_1_PRIVATE_KEY!, provider)
  const owner2Signer = new ethers.Wallet(OWNER_2_PRIVATE_KEY!, provider)

  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer,
  })

  const ethAdapterOwner2 = new EthersAdapter({
    ethers,
    signerOrProvider: owner2Signer,
  })

  //@ts-ignore
  const apiKit = new SafeApiKit.default({
    chainId: ethers.toBigInt(1),
    txServiceUrl: SAFE_TXS_URL,
  })

  const safeFactory = await SafeFactory.create({
    ethAdapter: ethAdapterOwner1,
  })

  const usdc = new ethers.Contract(USDC, erc20Abi, provider)
  const weth = new ethers.Contract(WETH, erc20Abi, provider)

  const rebalancerModule = new ethers.Contract(
    REBALANCER_MODULE,
    moduleAbi,
    provider
  )

  const aggregator = new ethers.Contract(
    AggregatorV3Address,
    V3abi,
    owner1Signer
  )

  return {
    provider,
    owner1Signer,
    ethAdapterOwner1,
    ethAdapterOwner2,
    apiKit,
    usdc,
    weth,
    rebalancerModule,
    safeFactory,
    aggregator,
  }
}

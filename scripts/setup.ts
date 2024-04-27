import { ethers } from 'ethers'
import Safe, {
  EthersAdapter,
  SigningMethod,
  SafeFactory,
} from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'
import {
  REBALANCER_MODULE,
  RPC_URL,
  SAFE_TXS_URL,
  USDC,
  WETH,
} from './constants'
import { abi as erc20Abi } from './data/erc20Abi.json'
import { abi as moduleAbi } from './data/moduleAbi.json'

export async function setup() {
  const provider = new ethers.JsonRpcProvider(RPC_URL)
  const owner1Signer = new ethers.Wallet(
    process.env.OWNER_1_PRIVATE_KEY!,
    provider
  )
  const owner2Signer = new ethers.Wallet(
    process.env.OWNER_2_PRIVATE_KEY!,
    provider
  )

  const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer,
  })

  const ethAdapterOwner2 = new EthersAdapter({
    ethers,
    signerOrProvider: owner2Signer,
  })

  const apiKit = new SafeApiKit({
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
  }
}

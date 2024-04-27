import { config } from 'dotenv'

config()

export const RPC_URL = 'http://localhost:8545'
export const OWNER_1_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY!
export const OWNER_2_PRIVATE_KEY = process.env.OWNER_2_PRIVATE_KEY!

export const USDC = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'
export const WETH = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'

export const REBALANCER_MODULE = '0xacF639B916b443498E6BF29E52a8216030843035'

export const SAFE_TXS_URL = 'http://localhost:8000/txs/api'

export const USDC_WHALE = '0xAE81FAc689A1b4b1e06e7ef4a2ab4CD8aC0A087D'

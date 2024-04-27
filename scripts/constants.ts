import { config } from 'dotenv'

config()

export const RPC_URL = 'http://localhost:8545'
export const OWNER_1_PRIVATE_KEY = process.env.OWNER_1_PRIVATE_KEY!
export const OWNER_2_PRIVATE_KEY = process.env.OWNER_2_PRIVATE_KEY!

export const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
export const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

export const REBALANCER_MODULE = '0x7aB5cEee0Ff304b053CE1F67d84C33F0ff407a55'

export const SAFE_TXS_URL = 'http://localhost:8000/txs/api'

export const USDC_WHALE = '0xDa9CE944a37d218c3302F6B82a094844C6ECEb17'

export const SERVER_URL = 'http://localhost:3000'
export const AggregatorV3Address = '0xD61210E756f7D71Cc4F74abF0747D65Ea9d7525b'

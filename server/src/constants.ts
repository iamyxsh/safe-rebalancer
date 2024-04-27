import { config } from 'dotenv';

config();

export const MONGO_URI = process.env.MONGO_URI!;

export const AggregatorV3Address = '0xD61210E756f7D71Cc4F74abF0747D65Ea9d7525b';
export const REBALANCER_MODULE = '0x7aB5cEee0Ff304b053CE1F67d84C33F0ff407a55';
export const RPC_URL = 'http://localhost:8545';

import dotenv from 'dotenv';
dotenv.config();

const INTERVAL: number = parseInt(`${process.env.INTERVAL}`);
const NETWORK = `${process.env.NETWORK}`
const EXCHANGE = `${process.env.EXCHANGE}`
const DATABASE_URL = `${process.env.DATABASE_URL}`
const SWAP_GRAPH_URL = `${process.env.SWAP_GRAPH_URL}`
const POOL_COUNT: number = parseInt(`${process.env.POOL_COUNT}`);

export default {
    INTERVAL,
    NETWORK,
    EXCHANGE,
    DATABASE_URL,
    SWAP_GRAPH_URL,
    POOL_COUNT,
}
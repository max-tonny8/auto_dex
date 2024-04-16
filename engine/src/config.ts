import { ChainId } from 'commons/models/chainId';
import { Exchange } from 'commons/models/exchange';
import dotenv from 'dotenv';
dotenv.config();

function getNetwork(network: string): ChainId {
    switch (network) {
        case 'goerli': return ChainId.GOERLI;
        case 'sepolia': return ChainId.SEPOLIA;
        default: return ChainId.MAINNET;
    }
}

function getExchange(exchange: string): Exchange {
    switch (exchange) {
        case 'pancakeswap': return Exchange.PancakeSwap;
        case 'sushiswap': return Exchange.SushiSwap;
        default: return Exchange.Uniswap;
    }
}

const WS_PORT: number = parseInt(`${process.env.WS_PORT}`);
const INTERVAL: number = parseInt(`${process.env.INTERVAL}`);
const NETWORK: string = `${process.env.NETWORK}`;
const NETWORK_2: ChainId = getNetwork(NETWORK);
const EXCHANGE: string = `${process.env.EXCHANGE}`;
const EXCHANGE_2: Exchange = getExchange(EXCHANGE);
const DATABASE_URL: string = `${process.env.DATABASE_URL}`;
const SWAP_GRAPH_URL: string = `${process.env.SWAP_GRAPH_URL}`;
const POOL_COUNT: number = parseInt(`${process.env.POOL_COUNT}`);

export default {
    WS_PORT,
    INTERVAL,
    NETWORK,
    NETWORK_2,
    EXCHANGE,
    EXCHANGE_2,
    DATABASE_URL,
    SWAP_GRAPH_URL,
    POOL_COUNT,
}
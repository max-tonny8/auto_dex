import { ChainId } from 'commons/models/chainId';
import { Exchange } from 'commons/models/exchange';
import ConfigBase from 'commons/configBase';

export default class Config extends ConfigBase {
    static WS_PORT: number = parseInt(`${process.env.WS_PORT}`);
    static MONITOR_INTERVAL: number = parseInt(`${process.env.INTERVAL}`);
    static NETWORK: string = `${process.env.NETWORK}`;
    static NETWORK_2: ChainId = Config.getNetwork(Config.NETWORK);
    static EXCHANGE: string = `${process.env.EXCHANGE}`;
    static EXCHANGE_2: Exchange = Config.getExchange(Config.EXCHANGE);
    static SWAP_GRAPH_URL: string = `${process.env.SWAP_GRAPH_URL}`;
    static POOL_COUNT: number = parseInt(`${process.env.POOL_COUNT}`);


    static getNetwork(network: string): ChainId {
        switch (network) {
            case 'goerli': return ChainId.GOERLI;
            case 'sepolia': return ChainId.SEPOLIA;
            default: return ChainId.MAINNET;
        }
    }
    
    static getExchange(exchange: string): Exchange {
        switch (exchange) {
            case 'pancakeswap': return Exchange.PancakeSwap;
            case 'sushiswap': return Exchange.SushiSwap;
            default: return Exchange.Uniswap;
        }
    }
}
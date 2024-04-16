import axios from 'axios';
import Config from '../config';
import { PoolData, TokenData} from './uniswapTypes';

export async function getTopPools(count: number = 20, skip: number = 0): Promise<PoolData[]> {
    const query = `
    {
        pools(first: ${count}, skip: ${skip}, orderBy: volumeUSD, orderDirection: desc)
        {
            id,
            volumeUSD,
            feeTier,
            token0Price,
            token1Price,
            token0 {
                symbol,
                id,
                decimals
            },
            token1 {
                symbol,
                id,
                decimals
            }
        }
    }`;

    const { data } = await axios.post(Config.SWAP_GRAPH_URL, { query });
    return data.data ? data.data.pools as PoolData[] : [];
}

export async function getTokens(skip: number = 0): Promise<TokenData[]> {
    const query = `
    {
        tokens(first: 1000, skip: ${skip})
        {
            symbol,
            id,
            decimals,
            name
        }
    }`;

    const { data } = await axios.post(Config.SWAP_GRAPH_URL, { query });
    return data.data ? data.data.tokens as TokenData[] : [];
}
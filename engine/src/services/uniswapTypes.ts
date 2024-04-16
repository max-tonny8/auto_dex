export type TokenData = {
    symbol: string;
    id: string;
    decimals: string;
    name?: string;
}

export type PriceData = {
    token0: TokenData;
    token1: TokenData;
    feeTier: string;
    token0Price: string;
    token1Price: string;
}

export type PoolData = PriceData & {
    id: string;
    volumeUSD: string;
}
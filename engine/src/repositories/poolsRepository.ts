import { ChainId } from 'commons/models/chainId';
import connect from './db';
import { Pool } from 'commons/models/pool';
import { Exchange } from 'commons/models/exchange';
import { PoolData } from 'src/services/uniswapTypes';
import Config from '../config';

async function countPools(exchange: Exchange, network: ChainId): Promise<number> {
    const db = await connect();

    const poolsCount = await db.pools.count({
        where: { exchange, network }
    });

    return poolsCount;
}

async function getPool(id: string): Promise<Pool | null> {
    const db = await connect();

    const pool = await db.pools.findUnique({
        where: { id }
    });

    return pool;
}

async function addPool(pool: Pool): Promise<Pool> {
    if(!pool.id) {
        throw new Error("Pool id is required");
    }

    const db = await connect();
    const createdPool = await db.pools.create({
        data: pool
    });

    return createdPool;
}

async function updatePrices(poolData: PoolData): Promise<Pool | null> {
    const newPrice0 = Number(poolData.token0Price);
    const newPrice1 = Number(poolData.token1Price);

    const db = await connect();

    let pool = await getPool(poolData.id);

    if(!pool) {
        pool = new Pool({
            id: poolData.id,
            exchange: Config.EXCHANGE_2,
            network: Config.NETWORK_2,
            fee: Number(poolData.feeTier),
            symbol0: poolData.token0.symbol,
            symbol1: poolData.token1.symbol,
            symbol: poolData.token0.symbol + poolData.token1.symbol,
            token0: poolData.token0.id,
            token1: poolData.token1.id,
        } as Pool);

       pool = await addPool(pool);
    }

    await db.pools.update({
        where: { id: poolData.id },
        data: {
            price0: poolData.token0Price,
            price1: poolData.token1Price,
            lastUpdate: new Date(),
        }
    });

    return getPool(poolData.id);
}

export default {
    countPools,
    getPool,
    addPool,
    updatePrices
}
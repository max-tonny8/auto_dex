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

function buildSet(newPrice: number, pool: any, tokenNumber: string, minutes: number) {
    const setObj: any = {};
    const xMinutesAgo = new Date(new Date().getTime() - (minutes * 60 * 1000)); // X minutes in the past

    if(pool[`lastUpdate_${minutes}`] <= xMinutesAgo) {
        const oldPriceX = Number(pool[`price${tokenNumber}_${minutes}`]);
        const priceChangeX = ((newPrice - oldPriceX) / oldPriceX) * 100;

        setObj[`price${tokenNumber}_${minutes}`] = `${newPrice}`;
        setObj[`price${tokenNumber}Change_${minutes}`] = priceChangeX && Number.isFinite(priceChangeX) ? priceChangeX : 0;
        setObj[`lastUpdate_${minutes}`] = new Date();
    }

    return setObj
}

function buildSetFull(pool: Pool, newPrice: number, tokenNumber: string) {
    if (!["0", "1"].includes(tokenNumber)) {
        throw new Error(`Invalid`);
    }

    const oldPrice = Number(tokenNumber === '0' ? pool.price0 : pool.price1);
    const priceChange = ((newPrice - oldPrice) / oldPrice) * 100;

    const setObj: any = {};
    setObj[`price${tokenNumber}`] = `${newPrice}`;
    setObj[`price${tokenNumber}Change`] = priceChange && Number.isFinite(priceChange) ? priceChange : 0;
    setObj.lastUpdate = new Date();

    const setObj_15 = buildSet(newPrice, pool, tokenNumber, 15);
    const setObj_60 = buildSet(newPrice, pool, tokenNumber, 60);

    return { ...setObj, ...setObj_15, ...setObj_60 };
}

async function updatePrices(poolData: PoolData): Promise<Pool | null> {
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

    const newPrice0 = Number(poolData.token0Price);
    const newPrice1 = Number(poolData.token1Price);

    const obj0 = buildSetFull(pool, newPrice0, "0");
    const obj1 = buildSetFull(pool, newPrice1, "1");

    await db.pools.update({
        where: { id: poolData.id },
        data: { ...obj0, ...obj1 }
    });

    return getPool(poolData.id);
}

export default {
    countPools,
    getPool,
    addPool,
    updatePrices
}
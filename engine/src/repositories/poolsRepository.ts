import connect from './db';
import { Pool } from 'commons/models/pool';

async function getPool(id: string): Promise<Pool | null> {
    const db = await connect();

    const pool = await db.pools.findUnique({
        where: { id }
    });

    return pool
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

export {
    getPool,
    addPool
}
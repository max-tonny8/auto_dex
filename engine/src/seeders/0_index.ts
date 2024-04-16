import { ISeeder } from "./ISeeder";
import tokensSeeder from './1_tokens';
import poolsSeeder from './2_pools';

const seeders: ISeeder[] = [
    tokensSeeder,
    poolsSeeder
]; 

async function start() {
    console.log('Initializing seeders index...');
    
    for(let i = 0; i < seeders.length; i++) {
        await seeders[i].execute();
    }

    console.log('Finalized seeders index.')
}

start();
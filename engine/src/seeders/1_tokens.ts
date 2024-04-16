import { ISeeder } from './ISeeder';
import tokensRepository from '../repositories/tokensRepository';
import Config from '../config';
import { TokenData } from 'src/services/uniswapTypes';
import { getTokens } from 'src/services/uniswapService';

export class TokensSeeder implements ISeeder {
    async execute(): Promise<void> {
        console.log(`Initializing tokens seeder`);

        console.log(`Checking if the tokens already exist...`);
        const count = await tokensRepository.countTokens(Config.NETWORK_2);
        if (count > 2) {
            console.log(`Tokens already exist. Exiting...`);
            return;
        }

        let skip: number = 0;
        let tokens: TokenData[] = [];

        do {
            tokens = await getTokens(skip);
            console.log(`Loaded ${tokens.length} tokens...`)

            for(let i = 0; i < tokens.length; i++) {
                const token = tokens[i];

                console.log(token.name);

                await tokensRepository.addToken({
                    id: token.id,
                    name: token.name!,
                    symbol: token.symbol,
                    decimals: parseInt(token.decimals)  ,
                    network: Config.NETWORK_2
                });
            }

            skip += tokens.length;
            console.log(`Processed ${tokens.length} tokens...`);
        } while(tokens.length > 0)

        console.log(`Finalized tokens seeder`);
    }
}

export default new TokensSeeder().execute(); // executes when imported
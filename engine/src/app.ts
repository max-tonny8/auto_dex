import Config from './config';
import { getTopPools } from './services/uniswapService';

getTopPools().then(data => console.log(data));
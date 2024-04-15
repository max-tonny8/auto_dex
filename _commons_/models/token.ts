import { ChainId } from "./chainid";

export type Token = {
    id: string;
    name: string;
    symbol: string;
    decimals: number;
    network: ChainId;
}
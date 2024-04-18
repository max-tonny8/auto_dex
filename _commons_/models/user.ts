import { ChainId } from "./chainId";
import { Status } from "./status";

export type User = {
    id?: string;
    address: string;
    name: string;
    email: string;
    status: Status;
    network: ChainId;
    planId: string;
    activationCode: string;
    activationDate: Date;
}
import { PrismaClient } from 'commons/data';

let singleton: PrismaClient;

export default async (): Promise<PrismaClient> => {
  if (!singleton) {
    singleton = new PrismaClient();
    await singleton.$connect();
  }
  return singleton;
};

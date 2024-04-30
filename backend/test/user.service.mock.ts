import { users } from 'commons/data';
import { ChainId } from 'commons/models/chainId';
import { Status } from 'commons/models/status';

export const newUserMock = {
  address: '0x123',
  name: 'Caique Ribeiro',
  email: 'caique@gmail.com',
  id: 'abc123',
  activationCode: '123456',
  activationDate: new Date(),
  network: ChainId.MAINNET,
  planId: 'Gold',
  privateKey: 'abc123',
  status: Status.NEW,
} as users;

export const blockedUserMock = {
  address: '0x123',
  name: 'Caique Ribeiro',
  email: 'caique@gmail.com',
  id: 'abc123',
  activationCode: '123456',
  activationDate: new Date(),
  network: ChainId.MAINNET,
  planId: 'Gold',
  privateKey: 'abc123',
  status: Status.BLOCKED,
} as users;

export const activeUserMock = {
  address: '0x123',
  name: 'Caique Ribeiro',
  email: 'caique@gmail.com',
  id: 'abc123',
  activationCode: '123456',
  activationDate: new Date(),
  network: ChainId.MAINNET,
  planId: 'Gold',
  privateKey: 'abc123',
  status: Status.ACTIVE,
} as users;

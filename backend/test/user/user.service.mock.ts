import { users } from 'commons/data';
import { ChainId } from 'commons/models/chainId';
import { Status } from 'commons/models/status';
import { UserService } from '../../src/user/user.service';

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

export const bannedUserMock = {
  address: '0x123',
  name: 'Caique Ribeiro',
  email: 'caique@gmail.com',
  id: 'abc123',
  activationCode: '123456',
  activationDate: new Date(),
  network: ChainId.MAINNET,
  planId: 'Gold',
  privateKey: 'abc123',
  status: Status.BANNED,
} as users;

export const userServiceMock = {
  provide: UserService,
  useValue: {
    getUserByWallet: jest.fn().mockResolvedValue(activeUserMock),
    getUser: jest.fn().mockResolvedValue(activeUserMock),
    addUser: jest.fn().mockResolvedValue(newUserMock),
    payUser: jest.fn().mockResolvedValue(activeUserMock),
    updateUser: jest.fn().mockResolvedValue(activeUserMock),
    activateUser: jest.fn().mockResolvedValue(blockedUserMock),
  },
};

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { bannedUserMock, userServiceMock } from '../user/user.service.mock';
import { authServiceMock } from './auth.service.mock';
import { mailerServiceMock } from './mailer.service.mock';
import { AuthDTO } from 'src/auth/auth.dto';
import { UserDTO } from 'src/user/user.dto';
import { ChainId } from 'commons/models/chainId';
import { Status } from 'commons/models/status';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

jest.mock('ethers', () => {
  return {
    ethers: {
      verifyMessage: (message: string, secret: string) => {
        if (!message || !secret) throw new Error('Invalid message or secret');
        return '0x123';
      },
    },
  };
});

describe('AuthController tests', () => {
  let authController: AuthController;

  const authDto = {
    secret: 'abc123',
    timestamp: Date.now(),
    wallet: '0x123',
  } as AuthDTO;

  const userDto = {
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
  } as UserDTO;

  beforeAll(async () => {
    const modelFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [userServiceMock, authServiceMock, mailerServiceMock],
    }).compile();

    authController = modelFixture.get<AuthController>(AuthController);
  });

  it('Should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('Should sign in', async () => {
    const result = await authController.signIn(authDto);
    expect(result).toBe('abc123');
  });

  it('Should not sign in (outdated timestamp)', async () => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    await expect(
      authController.signIn({ ...authDto, timestamp: oneHourAgo }),
    ).rejects.toEqual(new BadRequestException('timestamp too old'));
  });

  it('Should not sign in (invalid secret)', async () => {
    await expect(
      authController.signIn({ ...authDto, secret: null! }),
    ).rejects.toEqual(new BadRequestException('Invalid secret'));
  });

  it('Should not sign in (different wallet)', async () => {
    await expect(
      authController.signIn({ ...authDto, wallet: '0x456' }),
    ).rejects.toEqual(
      new UnauthorizedException('Wallet and secret do not match'),
    );
  });

  it('Should not sign in (banned user)', async () => {
    userServiceMock.useValue.getUserByWallet = jest
      .fn()
      .mockResolvedValue(bannedUserMock);
    await expect(authController.signIn(authDto)).rejects.toEqual(
      new UnauthorizedException('User is banned'),
    );
  });

  it('Should sign up', async () => {
    const result = await authController.signUp(userDto);
    expect(result).toBeDefined();
    expect(result.status).toBe(Status.NEW);
  });

  it('Should activate', async () => {
    const result = await authController.activate(userDto.address, '123456');
    expect(result).toBeDefined();
    expect(result).toEqual('abc123');
  });
});

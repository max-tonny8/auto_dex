import { Test, TestingModule } from '@nestjs/testing';
import { activeUserMock, userServiceMock } from './user.service.mock';
import { UserController } from '../../src/user/user.controller';
import { authServiceMock } from '../auth/auth.service.mock';
import { Status } from 'commons/models/status';
import { ForbiddenException } from '@nestjs/common';

describe('UserController tests', () => {
  let userController: UserController;

  beforeAll(async () => {
    const modelFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock, authServiceMock],
    }).compile();

    userController = modelFixture.get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('Should get user by wallet', async () => {
    const result = await userController.getUser(
      'authorization',
      activeUserMock.address,
    );
    expect(result).toBeDefined();
    expect(result.address).toEqual(activeUserMock.address);
  });

  it('Should NOT get user by wallet', async () => {
    await expect(
      userController.getUser('authorization', '0x1654'),
    ).rejects.toEqual(new ForbiddenException());
  });

  it('Should get user by id', async () => {
    const result = await userController.getUser(
      'authorization',
      activeUserMock.id,
    );
    expect(result).toBeDefined();
    expect(result.id).toEqual(activeUserMock.id);
  });

  it('Should NOT get user by id', async () => {
    await expect(
      userController.getUser('authorization', 'abc199'),
    ).rejects.toEqual(new ForbiddenException());
  });

  it('Should update user', async () => {
    const result = await userController.updateUser(
      'authorization',
      activeUserMock.id,
      { ...activeUserMock },
    );
    expect(result).toBeDefined();
    expect(result.id).toEqual(activeUserMock.id);
  });

  it('Should NOT update user', async () => {
    await expect(
      userController.updateUser('authorization', 'abc199', {
        ...activeUserMock,
      }),
    ).rejects.toEqual(new ForbiddenException());
  });

  it('Should pay user', async () => {
    const result = await userController.pay('authorization');
    expect(result).toBeDefined();
    expect(result.status).toEqual(Status.ACTIVE);
  });
});

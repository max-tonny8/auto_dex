import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import {
  activeUserMock,
  blockedUserMock,
  newUserMock,
} from './user.service.mock';
import { prismaMock } from './db.mock';
import { Status } from 'commons/models/status';
import { UserDTO } from 'src/user/user.dto';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

describe('UserService tests', () => {
  let userService: UserService;

  beforeAll(async () => {
    const modelFixture: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = modelFixture.get<UserService>(UserService);
  });

  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should get user by wallet', async () => {
    prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock });
    const result = await userService.getUserByWallet(newUserMock.address);
    expect(result).toBeDefined();
    expect(result.address).toBe(newUserMock.address);
  });

  it('should NOT get user by wallet', async () => {
    prismaMock.users.findFirst.mockResolvedValue(null);
    await expect(
      userService.getUserByWallet(newUserMock.address),
    ).rejects.toEqual(new NotFoundException());
  });

  it('should get user by ID', async () => {
    prismaMock.users.findUnique.mockResolvedValue({ ...newUserMock });
    const result = await userService.getUser(newUserMock.address);
    expect(result).toBeDefined();
    expect(result.id).toBe(newUserMock.id);
  });

  it('should NOT get user by ID', async () => {
    prismaMock.users.findUnique.mockResolvedValue(null);
    await expect(userService.getUser(newUserMock.address)).rejects.toEqual(
      new NotFoundException(),
    );
  });

  it('should add user', async () => {
    prismaMock.users.create.mockResolvedValue({ ...newUserMock });
    const result = await userService.addUser({ ...newUserMock });
    expect(result).toBeDefined();
    expect(result.id).toBe(newUserMock.id);
  });

  it('should NOT add user (update instead)', async () => {
    prismaMock.users.update.mockResolvedValue({
      ...newUserMock,
      activationCode: '654321',
      activationDate: new Date(),
    });
    prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock });
    const result = await userService.addUser({ ...newUserMock });
    expect(result).toBeDefined();
    expect(result.activationCode).not.toEqual(newUserMock.activationCode);
    expect(result.activationDate.getTime()).toBeGreaterThan(
      newUserMock.activationDate.getTime(),
    );
  });

  it('should NOT add user (conflict)', async () => {
    prismaMock.users.findFirst.mockResolvedValue({ ...activeUserMock });
    await expect(userService.addUser({ ...newUserMock })).rejects.toEqual(
      new ConflictException('User already exists with same wallet or email'),
    );
  });

  it('should pay user', async () => {
    prismaMock.users.findFirst.mockResolvedValue({ ...blockedUserMock });
    prismaMock.users.update.mockResolvedValue({ ...activeUserMock });
    const result = await userService.payUser(blockedUserMock.address);
    expect(result).toBeDefined();
    expect(result.status).toBe(Status.ACTIVE);
  });

  it('should NOT pay user', async () => {
    prismaMock.users.findFirst.mockResolvedValue({ ...activeUserMock });
    await expect(userService.payUser(blockedUserMock.address)).rejects.toEqual(
      new ForbiddenException(),
    );
  });

  it('should update user', async () => {
    prismaMock.users.findFirst.mockResolvedValue({ ...activeUserMock });
    prismaMock.users.update.mockResolvedValue({ ...activeUserMock });
    const result = await userService.updateUser(newUserMock.id, {
      ...activeUserMock,
    } as UserDTO);
    expect(result).toBeDefined();
    expect(result.id).toBe(activeUserMock.id);
  });

  it('should activate user', async () => {
    prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock });
    prismaMock.users.update.mockResolvedValue({ ...blockedUserMock });
    const result = await userService.activateUser(
      newUserMock.address,
      newUserMock.activationCode,
    );
    expect(result).toBeDefined();
    expect(result.status).toBe(Status.BLOCKED);
  });

  it('should NOT activate user (wrong code)', async () => {
    prismaMock.users.findFirst.mockResolvedValue({
      ...newUserMock,
      activationCode: '111',
    });
    await expect(
      userService.activateUser(newUserMock.address, newUserMock.activationCode),
    ).rejects.toEqual(new UnauthorizedException('Wrong activation code'));
  });

  it('should NOT activate user (outdated code)', async () => {
    prismaMock.users.findFirst.mockResolvedValue({
      ...newUserMock,
      activationDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
    });
    await expect(
      userService.activateUser(newUserMock.address, newUserMock.activationCode),
    ).rejects.toEqual(new UnauthorizedException('Activation code expired'));
  });

  it('should NOT activate user (already active)', async () => {
    prismaMock.users.findFirst.mockResolvedValue({
      ...activeUserMock,
    });
    const result = await userService.activateUser(
      activeUserMock.address,
      activeUserMock.activationCode,
    );
    expect(result).toBeDefined();
    expect(result.status).toBe(Status.ACTIVE);
  });
});

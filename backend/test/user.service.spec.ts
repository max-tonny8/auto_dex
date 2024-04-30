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

  it('should get user by ID', async () => {
    prismaMock.users.findUnique.mockResolvedValue({ ...newUserMock });
    const result = await userService.getUser(newUserMock.address);
    expect(result).toBeDefined();
    expect(result.id).toBe(newUserMock.id);
  });

  it('should add user', async () => {
    prismaMock.users.create.mockResolvedValue({ ...newUserMock });
    const result = await userService.addUser(newUserMock);
    expect(result).toBeDefined();
    expect(result.id).toBe(newUserMock.id);
  });

  it('should pay user', async () => {
    prismaMock.users.findFirst.mockResolvedValue({ ...blockedUserMock });
    prismaMock.users.update.mockResolvedValue({ ...activeUserMock });
    const result = await userService.payUser(blockedUserMock.address);
    expect(result).toBeDefined();
    expect(result.status).toBe(Status.ACTIVE);
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
});

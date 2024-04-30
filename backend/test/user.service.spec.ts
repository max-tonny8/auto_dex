import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { newUserMock } from './user.service.mock';
import { prismaMock } from './db.mock';

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

  it('should get user by waller', async () => {
    prismaMock.users.findFirst.mockResolvedValue({ ...newUserMock });
    const result = await userService.getUserByWallet(newUserMock.address);
    expect(result).toBeDefined();
    expect(result.address).toBe(newUserMock.address);
  });
});

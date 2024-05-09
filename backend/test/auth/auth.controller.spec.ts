import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { jwtServiceMock } from './jwt.service.mock';

describe('AuthController tests', () => {
  let authService: AuthService;

  beforeAll(async () => {
    const modelFixture: TestingModule = await Test.createTestingModule({
      providers: [jwtServiceMock, AuthService],
    }).compile();

    authService = modelFixture.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });
});

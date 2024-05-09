import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { jwtServiceMock } from './jwt.service.mock';
import { jwtMock } from './auth.service.mock';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService tests', () => {
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

  it('Should create token', () => {
    const result = authService.createToken(jwtMock);
    expect(result).toBeTruthy();
  });

  it('Should decode token', () => {
    const result = authService.decodeToken('abc123');
    expect(result).toBeDefined();
    expect(result.userId).toEqual(jwtMock.userId);
  });

  it('Should check token', () => {
    const result = authService.checkToken('abc123');
    expect(result).toBeTruthy();
  });

  it('Should NOT checj token', async () => {
    await expect(authService.checkToken(null!)).rejects.toEqual(
      new UnauthorizedException('Invalid JWT'),
    );
  });
});

import { JwtService } from '@nestjs/jwt';
import { jwtMock } from './auth.service.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockResolvedValue('abc123'),
    decode: jest.fn().mockReturnValue(jwtMock),
    verify: jest.fn().mockResolvedValue(true),
  },
};

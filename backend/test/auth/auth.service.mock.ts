import { JWT } from 'commons/models/jwt';
import { AuthService } from '../../src/auth/auth.service';
import { Status } from 'commons/models/status';

export const jwtMock = {
  address: '0x123',
  name: 'Caique Ribeiro',
  planId: 'Gold',
  status: Status.ACTIVE,
  userId: 'abc123',
} as JWT;

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockResolvedValue('abc123'),
    decodeToken: jest.fn().mockReturnValue(jwtMock),
    checkToken: jest.fn().mockResolvedValue(true),
  },
};

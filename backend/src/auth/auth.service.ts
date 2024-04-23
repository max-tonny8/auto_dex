import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT } from 'commons/models/jwt';
import Config from '../config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload: JWT): string {
    return this.jwtService.sign(payload, {
      secret: Config.JWT_SECRET,
      expiresIn: Config.JWT_EXPIRES,
    });
  }

  decodeToken(authorization: string): JWT {
    return this.jwtService.decode(authorization.replace('Bearer ', ''));
  }

  checkToken(token: string): JWT | false {
    try {
      return this.jwtService.verify(token.replace('Bearer ', ''), {
        secret: Config.JWT_SECRET,
      }) as JWT;
    } catch (error) {
      return false;
    }
  }
}

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'commons/models/user';
import db from '../db';
import { UserDTO } from './user.dto';
import { Status } from 'commons/models/status';
import Config from '../config';
import { encrypt, decrypt } from 'commons/services/cryptoService';

@Injectable()
export class UserService {
  async getUserByWallet(address: string): Promise<User> {
    const user = await db.users.findFirst({
      where: {
        address: {
          equals: address,
          mode: 'insensitive',
        },
      },
    });

    if (!user) throw new NotFoundException();

    user.privateKey = '';
    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await db.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException();

    user.privateKey = decrypt(user.privateKey);

    return user;
  }

  async addUser(user: UserDTO): Promise<User> {
    const oldUser = await db.users.findFirst({
      where: {
        OR: [
          {
            address: user.address,
          },
          {
            email: user.email,
          },
        ],
      },
    });

    if (oldUser) {
      if (oldUser.status !== Status.NEW) {
        throw new ConflictException(
          'User already exists with same wallet or email',
        );
      } else {
        return db.users.update({
          where: { id: oldUser.id },
          data: {
            // refresh the activation code and time
            activationCode: UserService.generateActivationCode(6),
            activationDate: new Date(),
          },
        });
      }
    }

    const newUser = await db.users.create({
      data: {
        address: user.address,
        name: user.name,
        email: user.email,
        status: Status.NEW,
        planId: user.planId,
        activationCode: UserService.generateActivationCode(6),
        activationDate: new Date(),
        privateKey: '',
        network: Config.CHAIN_ID,
      },
    });
    return newUser;
  }

  async updateUser(id: string, user: UserDTO): Promise<User> {
    const data: any = {
      address: user.address,
      email: user.email,
      name: user.name,
    };

    if (user.privateKey) {
      data.privateKey = encrypt(user.privateKey);
    }

    const updatedUser = await db.users.update({
      where: { id: id },
      data: data,
    });

    if (updatedUser) {
      updatedUser.privateKey = '';
    }

    return updatedUser;
  }

  async payUser(address: string): Promise<User> {
    const user = await this.getUserByWallet(address);
    if (user.status !== Status.BLOCKED) throw new ForbiddenException();
    // todo: pay via blockchain

    const updatedUser = await db.users.update({
      where: { id: user.id },
      data: {
        status: Status.ACTIVE,
      },
    });

    updatedUser.privateKey = '';
    return updatedUser;
  }

  static generateActivationCode(length: number): string {
    const validChars = '0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
      token += validChars[Math.floor(Math.random() * validChars.length)];
    }

    return token;
  }

  async activateUser(wallet: string, code: string): Promise<User> {
    const user = await this.getUserByWallet(wallet);
    if (user.status !== Status.NEW) return user;

    if (user.activationCode !== code) {
      throw new UnauthorizedException('Wrong activation code');
    }

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    if (user.activationDate < tenMinutesAgo) {
      throw new UnauthorizedException('Activation code expired');
    }

    const updatedUser = await db.users.update({
      where: { id: user.id },
      data: {
        status: Status.BLOCKED,
      },
    });

    updatedUser.privateKey = '';
    return updatedUser;
  }
}

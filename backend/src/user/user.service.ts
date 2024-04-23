import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'commons/models/user';
import connect from '../db';
import { UserDTO } from './user.dto';
import { Status } from 'commons/models/status';
import Config from '../config';

@Injectable()
export class UserService {
  async getUserByWallet(address: string): Promise<User> {
    const db = await connect();
    const user = await db.users.findFirst({
      where: {
        address: {
          equals: address,
          mode: 'insensitive',
        },
      },
    });
    user.privateKey = '';
    return user;
  }

  async getUser(id: string): Promise<User> {
    const db = await connect();
    const user = await db.users.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async addUser(user: UserDTO): Promise<User> {
    const db = await connect();

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
            activationCode: UserService.generateToken(6),
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
        activationCode: UserService.generateToken(6),
        activationDate: new Date(),
        privateKey: '',
        network: Config.CHAIN_ID,
      },
    });
    return newUser;
  }

  async updateUser(id: string, user: UserDTO): Promise<User> {
    const db = await connect();

    const data: any = {
      address: user.address,
      email: user.email,
      name: user.name,
      status: user.status,
    };

    if (user.privateKey) {
      data.privateKey = user.privateKey; // todo: encrypt privateKey
    }

    const updatedUser = await db.users.update({
      where: { id: id },
      data: data,
    });

    updatedUser.privateKey = '';
    return updatedUser;
  }

  async payUser(address: string): Promise<User> {
    const user = await this.getUserByWallet(address);
    if (!user) throw new NotFoundException();
    if (user.status !== Status.BLOCKED) throw new ForbiddenException();

    const db = await connect();

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

  static generateToken(length: number): string {
    const validChars = '0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
      token += validChars[Math.floor(Math.random() * validChars.length)];
    }

    return token;
  }
}

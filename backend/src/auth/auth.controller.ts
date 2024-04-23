import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { UserDTO } from '../user/user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'commons/models/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  signIn(@Body() data: AuthDTO): object {
    return data;
  }

  @Post('/signup')
  async signUp(@Body() data: UserDTO): Promise<User> {
    const user = await this.userService.addUser(data);
    // todo: send confirmation email
    return user;
  }

  @Post('/activate/:wallet/:code')
  async activate(
    @Param('wallet') wallet: string,
    @Param('code') code: string,
  ): Promise<string> {
    const user = await this.userService.activateUser(wallet, code);

    // send welcome email

    // generate JWT token

    return user.id; // replace by jwt
  }
}

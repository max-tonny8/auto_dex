import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
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
    // todo: send activation email
    return user;
  }

  @Post('/activate/:wallet/:token')
  activate(
    @Param('wallet') wallet: string,
    @Param('token', ParseIntPipe) token: number,
  ): object {
    return { wallet, token };
  }
}

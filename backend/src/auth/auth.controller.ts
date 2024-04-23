import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { UserDTO } from './user.dto';

@Controller('auth')
export class AuthController {
  @Post('/signin')
  signIn(@Body() data: AuthDTO): object {
    return data;
  }

  @Post('/signup')
  signUp(@Body() data: UserDTO): object {
    return data;
  }

  @Post('/activate/:wallet/:token')
  activate(
    @Param('wallet') wallet: string,
    @Param('token', ParseIntPipe) token: number,
  ): object {
    return { wallet, token };
  }
}

import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { UserDTO } from '../user/user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'commons/models/user';
import { MailerService } from '@nestjs-modules/mailer';
import Config from '../config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signin')
  signIn(@Body() data: AuthDTO): object {
    return data;
  }

  @Post('/signup')
  async signUp(@Body() data: UserDTO): Promise<User> {
    const user = await this.userService.addUser(data);

    this.mailerService.sendMail({
      to: user.email,
      subject: 'Activate your user on Poseidon',
      text: `Hi, ${user.name}!
      
      Use the link below to finish your signup (copy and paste if link doesn't work):

      ${Config.SITE_URL}/activate/${user.address}/${user.activationCode}

      Or if you are with the activation page open, use the code below:

      ${user.activationCode}

      Thanks!

      Poseidon Team.
      `,
    });

    return user;
  }

  @Post('/activate/:wallet/:code')
  async activate(
    @Param('wallet') wallet: string,
    @Param('code') code: string,
  ): Promise<string> {
    const user = await this.userService.activateUser(wallet, code);

    this.mailerService.sendMail({
      to: user.email,
      subject: 'User activated.',
      text: `Hi, ${user.name}!
      
      Your user is activated, but before start bot trading, you need to path the first month in advance.

      Use the link below to make you payment (copy and paste if link doesn't work):

      ${Config.SITE_URL}/pay/${user.address}

      Or if you are with the website opened, just click in login button again.

      Thanks!

      Poseidon Team.
      `,
    });

    return this.authService.createToken({
      userId: user.id,
      address: user.address,
      name: user.name,
      planId: user.planId,
      status: user.status,
    });
  }
}

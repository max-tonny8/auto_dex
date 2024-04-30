import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './auth.dto';
import { UserDTO } from '../user/user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'commons/models/user';
import { MailerService } from '@nestjs-modules/mailer';
import Config from '../config';
import { AuthService } from './auth.service';
import { ethers } from 'ethers';
import { Status } from 'commons/models/status';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signin')
  async signIn(@Body() data: AuthDTO): Promise<string> {
    const aMinuteAgo = Date.now() - 60 * 1000;
    if (data.timestamp < aMinuteAgo) {
      throw new BadRequestException('timestamp too old');
    }

    const message = Config.AUTH_MSG.replace('<timestamp>', `${data.timestamp}`);

    let signer: string;

    try {
      signer = ethers.verifyMessage(message, data.secret);
    } catch (error) {
      throw new BadRequestException('Invalid secret');
    }

    if (signer.toUpperCase() !== data.wallet.toUpperCase()) {
      throw new UnauthorizedException('Wallet and secret do not match');
    }

    const user = await this.userService.getUserByWallet(data.wallet);
    if (!user) throw new NotFoundException('User not found');
    if (user.status === Status.BANNED)
      throw new UnauthorizedException('User is banned');

    return this.authService.createToken({
      userId: user.id as string,
      address: user.address,
      name: user.name,
      planId: user.planId,
      status: user.status,
    });
  }

  @Post('/signup')
  async signUp(@Body() data: UserDTO): Promise<User> {
    const user = await this.userService.addUser(data);

    this.mailerService.sendMail({
      to: user.email,
      subject: 'Activate your user on Poseidon',
      text: `Hi, ${user.name}!
      
      Use the link below to finish your signup (copy and paste if link doesn't work):

      ${Config.SITE_URL}/register/activate?wallet=${user.address}&token=${user.activationCode}

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
      userId: user.id as string,
      address: user.address,
      name: user.name,
      planId: user.planId,
      status: user.status,
    });
  }
}

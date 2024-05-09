import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('pay')
  async pay(@Headers('Authorization') authorization: string) {
    const jwt = this.authService.decodeToken(authorization);
    return await this.userService.payUser(jwt.address);
  }

  @UseGuards(AuthGuard)
  @Get(':identifier')
  async getUser(
    @Headers('Authorization') authorization: string,
    @Param('identifier') identifier: string,
  ) {
    const jwt = this.authService.decodeToken(authorization);
    if (identifier.startsWith('0x')) {
      if (jwt.address.toUpperCase() !== identifier.toUpperCase())
        throw new ForbiddenException();
      return await this.userService.getUserByWallet(identifier);
    } else {
      if (jwt.userId.toUpperCase() !== identifier.toUpperCase())
        throw new ForbiddenException();
      const user = await this.userService.getUser(identifier);
      user.privateKey = '';
      return user;
    }
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  async updateUser(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
    @Body() data: UserDTO,
  ) {
    const jwt = this.authService.decodeToken(authorization);
    if (jwt.userId.toUpperCase() !== id.toUpperCase())
      throw new ForbiddenException();
    return this.userService.updateUser(id, data);
  }
}

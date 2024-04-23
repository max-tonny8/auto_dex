import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('pay')
  async pay(@Headers('Authorization') authorization: string) {
    // TODO: token decode

    await this.userService.payUser(authorization);
  }

  @Get(':identifier')
  async getUser(
    @Headers('Authorization') authorization: string,
    @Param('identifier') identifier: string,
  ) {
    if (identifier.startsWith('0x')) {
      return await this.userService.getUserByWallet(identifier);
    } else {
      const user = await this.userService.getUser(identifier);
      user.privateKey = '';
      return user;
    }
  }

  @Post(':id')
  async updateUser(
    @Headers('Authorization') authorization: string,
    @Param('id') id: string,
    @Body() data: UserDTO,
  ) {
    return this.userService.updateUser(id, data);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { RequestUser } from '../shared/decorators';
import { User } from './models';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me/profile')
  async getProfile(@RequestUser() user: User) {
    const { password, ...profile } = user;
    return profile;
  }
}

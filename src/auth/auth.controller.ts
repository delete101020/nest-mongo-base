import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RequestUser } from '../shared/decorators';
import { User } from '../user/models';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@RequestUser() user: User) {
    return this.authService.login(user);
  }
}

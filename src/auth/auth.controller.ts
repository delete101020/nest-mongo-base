import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from '../shared/decorators';
import { User } from '../user/models';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';
import {
  FacebookAuthGuard,
  GoogleAuthGuard,
  LinkedInAuthGuard,
  LocalAuthGuard,
} from './guards';

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

  /** For testing */
  @UseGuards(FacebookAuthGuard)
  @Get('facebook')
  async facebookLogin() {
    return true;
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook/callback')
  async facebookLoginCallback(@Req() req: Request) {
    return req.user;
  }

  /** For testing */
  @UseGuards(LinkedInAuthGuard)
  @Get('linkedin')
  async linkedInLogin() {
    return true;
  }

  @UseGuards(LinkedInAuthGuard)
  @Get('linkedin/callback')
  async linkedInLoginCallback(@Req() req: Request) {
    return req.user;
  }

  /** For testing */
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleLogin() {
    return true;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleLoginCallback(@Req() req: Request) {
    return req.user;
  }
}

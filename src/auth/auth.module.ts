import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  FacebookStrategy,
  GoogleStrategy,
  JwtStrategy,
  LinkedInStrategy,
  LocalStrategy,
} from './strategies';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    FacebookStrategy,
    GoogleStrategy,
    LinkedInStrategy,
  ],
})
export class AuthModule {}

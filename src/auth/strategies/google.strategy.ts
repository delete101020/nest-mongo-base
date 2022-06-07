import { Injectable, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigVar } from '../../shared/config/config.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>(ConfigVar.GOOGLE_CLIENT_ID),
      clientSecret: configService.get<string>(ConfigVar.GOOGLE_CLIENT_SECRET),
      callbackURL: `https://3876-171-239-130-148.ngrok.io/api/v1/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    done(null, profile);
  }
}

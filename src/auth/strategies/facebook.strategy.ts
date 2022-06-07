import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { ConfigVar } from '../../shared/config/config.enum';
import { UserService } from '../../user/user.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private userService: UserService) {
    super({
      clientID: configService.get<string>(ConfigVar.FACEBOOK_APP_ID),
      clientSecret: configService.get<string>(ConfigVar.FACEBOOK_APP_SECRET),
      callbackURL: `http://${configService.get<string>(
        ConfigVar.HOST,
      )}:${configService.get<number>(
        ConfigVar.PORT,
      )}/api/v1/auth/facebook/callback`,
      scope: ['email'],
      profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user: any, info?: any) => void,
  ) {
    done(null, profile);
  }
}

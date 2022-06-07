import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-linkedin-oauth2';
import { ConfigVar } from '../../shared/config/config.enum';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>(ConfigVar.LINKEDIN_CLIENT_ID),
      clientSecret: configService.get<string>(ConfigVar.LINKEDIN_CLIENT_SECRET),
      callbackURL: `http://${configService.get<string>(
        ConfigVar.HOST,
      )}:${configService.get<number>(
        ConfigVar.PORT,
      )}/api/v1/auth/linkedin/callback`,
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  async validate(
    token: string,
    tokenSecret: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    done(null, profile);
  }
}

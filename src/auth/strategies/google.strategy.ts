import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_OAUTH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_OAUTH_CALLBACK_URL'),
      passReqToCallback: false,
      accessType: 'offline',
      prompt: 'consent',
      scope: ['profile', 'email'],
    });
  }

  public validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, name, photos, emails } = profile;

    done(null, {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    });
  }
}

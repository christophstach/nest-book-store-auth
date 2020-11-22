import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import {
  ApiDefaultResponse,
  ApiExcludeEndpoint,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiDefaultResponse({
    description:
      'On successful login google oauth calls the google/redirect endpoint',
  })
  googleAuth() {
    // Just a placeholder
  }

  @Get('google/redirect')
  @Redirect()
  @UseGuards(AuthGuard('google'))
  @ApiDefaultResponse({
    description:
      'This endpoints is called by google oauth service. On successful login it generates a JWT token and redirects further to the frontend app',
  })
  async googleAuthRedirect(@Req() req) {
    const user = req.user;

    if (user) {
      const jwt = this.jwtService.sign(user);

      return {
        url: this.configService
          .get<string>('LOGIN_SUCCESS_REDIRECT')
          .replace(':jwt', jwt),
      };
    } else {
      return { url: this.configService.get<string>('LOGIN_FAILURE_REDIRECT') };
    }
  }
}

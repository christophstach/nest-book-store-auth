import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
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
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Just a placeholder
  }

  @Get('google/redirect')
  @Redirect()
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
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

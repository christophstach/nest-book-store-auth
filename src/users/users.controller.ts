import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  @Get()
  findAll() {
    console.log('test');
    return 'fetchAll';
  }
}

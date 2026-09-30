import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const usertoken = await this.authService.validateUser(data);

    if (!usertoken) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return usertoken;
  }
}
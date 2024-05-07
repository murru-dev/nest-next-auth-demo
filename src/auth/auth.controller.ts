import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dot/auth-payload.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() authPayload: AuthPayloadDto) {
    const user = this.authService.validateUser(authPayload);
    if (!user) throw new HttpException('User not found', 401);

    return this.authService.validateUser(authPayload);
  }
}

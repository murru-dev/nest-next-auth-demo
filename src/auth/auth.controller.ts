import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dot/auth-payload.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() authPayload: AuthPayloadDto) {
    return this.authService.signUp(authPayload);
  }

  @Post('login')
  login(@Body() authPayload: AuthPayloadDto) {
    return this.authService.signIn(authPayload);
  }
}

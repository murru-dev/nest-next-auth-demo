import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class UsersController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signUp(@Request() req) {
    // Handle sign-up logic here
  }

  // This method handles the login request from NextAuth.js
  @Post('api/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
}
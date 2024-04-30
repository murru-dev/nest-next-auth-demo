import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { UsersController } from './auth/users.controller'
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
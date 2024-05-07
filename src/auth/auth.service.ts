import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dot/auth-payload.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    @Inject(forwardRef(() => JwtService))
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, hash }: AuthPayloadDto) {
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (!foundUser) return null;
    if (hash === foundUser.hash) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //const { hash, ...user } = foundUser;
      return this.jwtService.sign(foundUser);
    }
  }
}

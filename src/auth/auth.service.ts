import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dot/auth-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: AuthPayloadDto) {
    const createdUser = await this.prismaService.user.create({
      data: data,
    });

    return createdUser;
  }
  async signIn({ email }: AuthPayloadDto) {
    const foundUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!foundUser) throw new ForbiddenException('Usuario incorrecto');
    return this.jwtService.sign(foundUser);
  }
}

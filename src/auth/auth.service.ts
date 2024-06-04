import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(usernmae: string, pass: string, role: Role): Promise<any> {
    const user = await this.user.findUserByEmail(usernmae, role);

    const isValidPass = await bcrypt.compare(pass, user.password);

    if (!isValidPass) {
      throw new UnauthorizedException();
    }
    delete user['password'];

    const { id, ...rest } = user;

    const payload = { sub: id, user: rest };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

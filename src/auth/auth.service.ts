import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UsersService,
    // private readonly jwtService: JwtService,
  ) {}
  async signIn(usernmae: string, pass: string): Promise<any> {
    const user = await this.user.findUserByEmail(usernmae);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const firstNameLastName = user.firstname + user.lastname;
    const payload = { sub: user.id, user: firstNameLastName };
    return {
      // accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

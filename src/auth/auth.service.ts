import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (!user) {
      return null;
    }
    const { password, ...result } = user;
    const passwordValid = await bcrypt.compare(pass, password);
    if (!passwordValid) return null;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, name: user.name };
    return { access_token: this.jwtService.sign(payload) };
  }
}

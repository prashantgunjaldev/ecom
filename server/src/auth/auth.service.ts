import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { mobile: user.mobile, name: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: "36000s",
      user:{
        id: user.id,
        name: user.name,
        mobile: user.mobile
      }
    };
  }

  async register(user: any) {
    return this.usersService.create(user);
  }
}
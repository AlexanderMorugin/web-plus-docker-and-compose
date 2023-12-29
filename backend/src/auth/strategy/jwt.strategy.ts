import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(jwtPaylode: { sub: number }) {
    const user = await this.usersService.findOne(jwtPaylode.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

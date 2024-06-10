import { env } from '@/config/env';
import { JWTPayload } from '@/modules/user/user.interface';
import * as jwt from 'jsonwebtoken';

export function generateToken(
  jwtPayload: JWTPayload,
  expiresIn = '15d',
  secret = env.JWT_SECRET
) {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
}

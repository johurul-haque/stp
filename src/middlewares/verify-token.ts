import { env } from '@/config/env';
import { jwtPayload } from '@/modules/user/user.validation';
import { AppError, catchAsync } from '@/utils';
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

export function verifyToken(role?: Role) {
  return catchAsync((req, _, next) => {
    try {
      const bearerToken = req.headers.authorization;

      if (!bearerToken) throw new Error();

      const decoded = jwt.verify(bearerToken, env.JWT_SECRET);

      req.jwtPayload = jwtPayload.parse(decoded);

      if (role && role !== req.jwtPayload.role) throw new Error();

      return next();
    } catch (error) {
      throw new AppError(401, 'Unauthorized Access');
    }
  });
}

import { db } from '@/config/db';
import { AppError } from '@/utils';
import { JWTPayload } from '../user/user.interface';
import { userInfoPayload } from './admin.validation';

export async function getAllUsers(jwtPayload: JWTPayload) {
  return db.user.findMany({
    where: {
      NOT: {
        id: jwtPayload.userId,
      },
    },
  });
}

export async function updateUserInfo(userId: string, payload: userInfoPayload) {
  try {
    return db.user.update({
      where: { id: userId },
      data: payload,
    });
  } catch (error) {
    throw new AppError(404, 'User not found');
  }
}

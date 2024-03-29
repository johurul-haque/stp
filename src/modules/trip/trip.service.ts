import { db } from '@/config/db';
import { AppError } from '@/utils';
import { JWTPayload } from '../user/user.interface';
import { CreateTripPayload } from './trip.interface';

export async function create(
  payload: CreateTripPayload,
  jwtPayload: JWTPayload
) {
  const user = await db.user.findFirst({ where: { id: jwtPayload.userId } });

  if (!user) throw new AppError(404, 'User not found');

  return db.trip.create({
    data: {
      ...payload,
      userId: user.id,
    },
  });
}

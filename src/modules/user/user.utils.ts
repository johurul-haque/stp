import { db } from '@/config/db';
import { AppError } from '@/utils';

export async function findUserOrThrow(id: string) {
  const user = await db.user.findUnique({ where: { id } });

  if (!user) throw new AppError(404, 'User not found!');

  return user;
}

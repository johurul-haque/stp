import { AppError } from '@/utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handleUniqueConstraints(error: unknown) {
  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    if (
      error.meta &&
      'target' in error.meta &&
      Array.isArray(error.meta.target)
    ) {
      const field = error.meta.target[0];

      throw new AppError(409, `${field} already taken 🥲`);
    }

    throw new AppError(409, 'User already exists!');
  }
}

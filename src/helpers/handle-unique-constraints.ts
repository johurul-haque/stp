import { AppError } from '@/utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handleUniqueConstraints(error: unknown) {
  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    console.log(error);
    throw new AppError(409, 'Unique key violation');
  }
}

import { db } from '@/config/db';
import { handleUniqueConstraints } from '@/helpers/handle-unique-constraints';
import { AppError } from '@/utils';
import { excludeFields } from '@/utils/exclude-fields';
import { generateToken } from '@/utils/generate-token';
import { compare } from 'bcrypt';
import type {
  JWTPayload,
  LoginPayload,
  RegisterPayload,
  UpdateUserProfilePayload,
  deleteProfilePayload,
  resetPasswordPayload,
} from './user.interface';
import { findUserOrThrow } from './user.utils';

export async function createUser(payload: RegisterPayload) {
  try {
    const user = await db.user.create({ data: payload });

    const access_token = generateToken({ userId: user.id, role: user.role });

    return {
      user: excludeFields(user, ['password']),
      access_token,
    };
  } catch (error) {
    handleUniqueConstraints(error);
  }
}

export async function login(payload: LoginPayload) {
  const user = await db.user.findFirst({
    where: { OR: [{ email: payload.email }, { username: payload.username }] },
  });

  if (!user) throw new AppError(404, "User doesn't exist!");

  const isMatching = await compare(payload.password, user.password);

  if (!isMatching) throw new AppError(401, 'Incorrect password!');

  const access_token = generateToken({ userId: user.id, role: user.role });

  return {
    user: excludeFields(user, ['password']),
    access_token,
  };
}

export async function resetPassword(
  payload: resetPasswordPayload,
  jwtPayload: JWTPayload
) {
  const user = await findUserOrThrow(jwtPayload.userId);

  const isMatching = await compare(payload.current_password, user.password);

  if (!isMatching) throw new AppError(401, 'Current password is incorrect.');

  const access_token = generateToken({ userId: user.id, role: user.role });

  return {
    access_token,
  };
}

export async function getUser(jwtPayload: JWTPayload) {
  return findUserOrThrow(jwtPayload.userId);
}

export async function updateUserProfile(
  payload: UpdateUserProfilePayload,
  jwtPayload: JWTPayload
) {
  return db.user.update({
    where: { id: jwtPayload.userId },
    data: payload,
  });
}

export async function deleteProfile(
  payload: deleteProfilePayload,
  jwtPayload: JWTPayload
) {
  const user = await findUserOrThrow(jwtPayload.userId);

  const isMatching = await compare(payload.password, user.password);

  if (!isMatching) throw new AppError(401, 'Incorrect password!');

  return db.user.delete({ where: { id: user.id } });
}
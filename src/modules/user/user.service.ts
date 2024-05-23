import { db } from '@/config/db';
import { AppError } from '@/utils';
import { excludeFields } from '@/utils/exclude-fields';
import { generateToken } from '@/utils/generate-token';
import { compare } from 'bcrypt';
import {
  JWTPayload,
  LoginPayload,
  RegisterPayload,
  UpdateUserProfilePayload,
} from './user.interface';
import { findUserOrThrow } from './user.utils';

export async function createUser(payload: RegisterPayload) {
  const { profile, ...data } = payload;

  const user = await db.$transaction(async (tsc) => {
    const userData = await tsc.user.create({ data });

    await tsc.profile.create({
      data: { ...profile, userId: userData.id },
    });

    return userData;
  });

  const access_token = generateToken({ userId: user.id });

  return {
    user: excludeFields(user, ['password']),
    access_token,
  };
}

export async function login(payload: LoginPayload) {
  const user = await db.user.findFirst({
    where: { OR: [{ email: payload.email }] },
  });

  if (!user) throw new AppError(404, 'User not found');

  const isPasswordMatching = await compare(payload.password, user.password);

  if (!isPasswordMatching) throw new AppError(401, 'Password mismatch!');

  const access_token = generateToken({ userId: user.id });

  return {
    user: excludeFields(user, ['password']),
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
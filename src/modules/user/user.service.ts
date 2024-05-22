import { db } from '@/config/db';
import { AppError } from '@/utils';
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
  const { profile, ...user } = payload;

  return await db.$transaction(async (transactionClient) => {
    const userData = await transactionClient.user.create({ data: user });

    await transactionClient.profile.create({
      data: { ...profile, userId: userData.id },
    });

    return userData;
  });
}

export async function login(payload: LoginPayload) {
  const user = await db.user.findUnique({ where: { email: payload.email } });

  if (!user) throw new AppError(404, 'User not found');

  const isPasswordMatching = await compare(payload.password, user.password);

  if (!isPasswordMatching) throw new AppError(401, 'Password mismatch!');

  const token = generateToken({ email: user.email, userId: user.id });

  return {
    ...user,
    token,
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
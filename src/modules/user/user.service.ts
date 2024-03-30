import { db } from '@/config/db';
import { AppError } from '@/utils';
import { generateToken } from '@/utils/generate-token';
import { compare } from 'bcrypt';
import { JWTPayload, LoginPayload, RegisterPayload } from './user.interface';

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
  const user = await db.user.findFirst({ where: { email: payload.email } });

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
  const user = await db.user.findUnique({ where: { id: jwtPayload.userId } });

  if (!user) throw new AppError(404, 'User not found');

  return user;
}
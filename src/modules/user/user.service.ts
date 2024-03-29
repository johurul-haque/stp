import { db } from '@/config/db';
import { RegisterPayload } from './user.interface';

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

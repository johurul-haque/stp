import { db } from '@/config/db';
import { TravelPairResponsePayload } from './trip-pairs.interface';

export async function getPairs(tripId: string) {
  const result = await db.travelPairRequest.findMany({
    where: { tripId },
    include: { user: true },
  });

  return result.map((pair) => ({
    ...pair,
    user: {
      name: pair.user.username,
      email: pair.user.email,
    },
  }));
}

export async function travelPairResponse(
  payload: TravelPairResponsePayload,
  buddyId: string
) {
  const row = await db.travelPairRequest.findFirstOrThrow({
    where: {
      tripId: payload.tripId,
      userId: buddyId,
    },
  });

  return db.travelPairRequest.update({
    where: { id: row.id },
    data: {
      status: payload.status,
    },
  });
}

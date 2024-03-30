import { db } from '@/config/db';

export async function getPairs(tripId: string) {
  const result = await db.travelPairRequest.findMany({
    where: { tripId },
    include: { user: true },
  });

  return result.map((pair) => ({
    ...pair,
    user: {
      name: pair.user.name,
      email: pair.user.email,
    },
  }));
}

export async function travelPairResponse(pairId: string) {
    
}

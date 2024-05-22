import { db } from '@/config/db';
import { Query } from '@/interface/query';
import { z } from 'zod';
import { JWTPayload } from '../user/user.interface';
import { findUserOrThrow } from '../user/user.utils';
import { CreateTripPayload, TripPairRequestPayload } from './trip.interface';
import { generateFilters } from './trip.utils';

export async function create(
  payload: CreateTripPayload,
  jwtPayload: JWTPayload
) {
  const user = await findUserOrThrow(jwtPayload.userId);

  return db.trip.create({
    data: {
      ...payload,
      userId: user.id,
    },
  });
}

export async function tripPairRequest(
  payload: TripPairRequestPayload,
  tripId: string
) {
  const user = await findUserOrThrow(payload.userId);

  return db.travelPairRequest.create({
    data: {
      userId: user.id,
      tripId,
      status: 'PENDING',
    },
  });
}

export async function getAllTrips(query: Query) {
  const pagination = {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
  };

  if (query.sortOrder) {
    z.enum(['asc', 'desc']).parse(query.sortOrder);
  }

  const orderBy = {
    [query.sortBy || 'createdAt']: query.sortOrder || 'desc',
  };

  const { filters } = generateFilters(query);

  const data = await db.trip.findMany({
    where: filters,
    skip: Math.abs(pagination.page - 1) * pagination.limit,
    take: pagination.limit,
    orderBy,
  });

  const meta = {
    ...pagination,
    total: await db.trip.count({ where: filters }),
  };

  return { meta, data };
}

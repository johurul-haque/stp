import { db } from '@/config/db';
import { Query } from '@/interface/query';
import { AppError } from '@/utils';
import { z } from 'zod';
import { JWTPayload } from '../user/user.interface';
import { findUserOrThrow } from '../user/user.utils';
import { CreateTripPayload } from './trip.interface';
import { generateFilters } from './trip.utils';
import { updateTripPayload } from './trip.validation';

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

export async function updateTrip(
  jwtPayload: JWTPayload,
  payload: updateTripPayload,
  tripId: string
) {
  try {
    return await db.trip.update({
      where: {
        id: tripId,
        userId: jwtPayload.role === 'ADMIN' ? undefined : jwtPayload.userId,
      },
      data: payload,
    });
  } catch (error) {
    throw new AppError(404, 'Could not find the requested trip!');
  }
}

export async function tripJoinRequest(tripId: string, jwtPayload: JWTPayload) {
  const user = await findUserOrThrow(jwtPayload.userId);

  return db.travelPairRequest.create({
    data: {
      userId: user.id,
      tripId,
      status: 'PENDING',
    },
  });
}

export async function getAllTrips(query: Query, jwtPayload?: JWTPayload) {
  const pagination = {
    page: Number(query._page) || 1,
    limit: Number(query._limit) || 10,
  };

  if (query.sort_order) {
    z.enum(['asc', 'desc']).parse(query.sort_order);
  }

  const orderBy = {
    [query.sort_by || 'createdAt']: query.sort_order || 'desc',
  };

  const { filters } = generateFilters(query);

  const data = await db.trip.findMany({
    where: {
      ...filters,
      userId: jwtPayload?.role === 'ADMIN' ? undefined : jwtPayload?.userId,
    },
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

export async function getSingleTrip(tripId: string, jwtPayload?: JWTPayload) {
  const result = await db.trip.findUnique({
    where: { id: tripId },
    include: {
      TravelPairRequest: !jwtPayload
        ? false
        : { where: { userId: jwtPayload?.userId } },
    },
  });

  if (!result) throw new AppError(404, 'Could not find the requested trip.');

  return result;
}

export async function deleteOne(tripId: string, userId: string) {
  try {
    return await db.trip.delete({ where: { id: tripId, userId } });
  } catch (error) {
    throw new AppError(404, 'Record not found!');
  }
}

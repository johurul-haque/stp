import { Query } from '@/interface/query';
import { Prisma } from '@prisma/client';
import { queryValidator } from './trip.validation';

export function generateFilters(query: Query) {
  const { destination, startDate, endDate } = queryValidator().parse(query);

  let filters: Prisma.TripWhereInput = {};

  if (destination) {
    filters = {
      ...filters,
      destination: {
        contains: destination,
        mode: 'insensitive',
      },
    };
  }

  if (startDate) {
    filters = {
      ...filters,
      AND: {
        startDate: {
          contains: startDate,
        },
      },
    };
  }

  if (endDate) {
    filters = {
      ...filters,
      AND: {
        startDate: {
          contains: endDate,
        },
      },
    };
  }

  return { filters };
}

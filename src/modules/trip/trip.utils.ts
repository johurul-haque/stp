import { Query } from '@/interface/query';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const toNumber = z.coerce.number();

export function generateFilters(query: Query) {
  const { searchTerm, minBudget, maxBudget, destination, ...dates } = query;

  let filters: Prisma.TripWhereInput = {};

  if (searchTerm) {
    const OR: Prisma.TripWhereInput[] = [];

    OR.push({
      destination: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    });

    filters = { ...filters, OR };
  }

  if (destination) {
    filters = {
      ...filters,
      destination: {
        contains: destination,
        mode: 'insensitive',
      },
    };
  }

  if (Object.keys(dates).length) {
    filters = {
      ...filters,
      AND: Object.keys(dates).map((field) => ({
        [field]: {
          equals: dates[field],
        },
      })),
    };
  }

  return { filters };
}

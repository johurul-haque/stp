import { Query } from '@/interface/query';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const toNumber = z.coerce.number();

export function generateFilters(query: Query) {
  const { searchTerm, minBudget, maxBudget, destination, ...dates } = query;

  let filters: Prisma.TripWhereInput = {};

  if (searchTerm) {
    const OR: Prisma.TripWhereInput[] = [];

    if (Number(searchTerm)) {
      OR.push({
        budget: {
          equals: toNumber.parse(searchTerm),
        },
      });
    } else {
      OR.push({
        destination: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      });
    }

    filters = { ...filters, OR };
  }

  if (minBudget) {
    filters = {
      ...filters,
      budget: { gte: toNumber.parse(minBudget) },
    };
  }

  if (maxBudget) {
    filters = {
      ...filters,
      budget: { lte: toNumber.parse(maxBudget) },
    };
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

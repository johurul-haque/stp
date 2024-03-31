import { Query } from '@/interface/query';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const toNumber = z.coerce.number();

export function generateFilters(query: Query) {
  const { searchTerm, minBudget, maxBudget, ...restQueries } = query;

  let filters: Prisma.TripWhereInput = {};

  if (searchTerm) {
    const OR = [];

    if (Number(searchTerm)) {
      OR.push({
        budget: {
          equals: toNumber.parse(query.searchTerm),
        },
      });
    } else {
      OR.push({
        destination: {
          contains: query.searchTerm,
          mode: 'insensitive',
        },
      });
    }

    filters = {
      ...filters,
      ...OR,
    };
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

  if (Object.keys(restQueries).length) {
    filters = {
      ...filters,
      AND: Object.keys(restQueries).map((field) => ({
        [field]: {
          equals: restQueries[field],
        },
      })),
    };
  }

  return { filters };
}

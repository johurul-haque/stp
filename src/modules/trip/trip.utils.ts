import { Query } from '@/interface/query';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const toNumber = z.coerce.number();

export function generateFilters(query: Query) {
  const { searchTerm, minBudget, maxBudget, ...restQueries } = query;

  let filters: Prisma.TripWhereInput = {};

  if (searchTerm) {
    filters = {
      ...filters,
      OR: ['destination', 'budget'].map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: 'insensitive',
        },
      })),
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

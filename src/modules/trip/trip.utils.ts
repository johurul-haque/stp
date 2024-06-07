import { Query } from '@/interface/query';
import { Prisma } from '@prisma/client';

export function generateFilters(query: Query) {
  let filters: Prisma.TripWhereInput = {};

  if (query._q) {
    const fields = ['travelType', 'destination'];

    const OR = fields.map((field) => ({
      [field]: {
        contains: query._q,
        mode: 'insensitive',
      },
    }));

    filters = {
      OR: [
        ...OR,
        {
          description: {
            search: query._q.split(' ').join(' | '),
            mode: 'insensitive',
          },
        },
        { startDate: { contains: query._q } },
        { endDate: { contains: query._q } },
      ],
    };
  }

  return { filters };
}

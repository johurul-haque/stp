import { Trip } from '@/types/trip';
import { clientFetch } from '../axios/client-fetch';
import { serverFetch } from '../axios/server-fetch';

export async function getAllTrips(
  params?: {
    _q?: string;
    _page?: string;
    _limit?: number;
  },
  is_private?: boolean
) {
  const url = '/api/trips';

  if (is_private) {
    const { data } = await serverFetch.get<Response>(url, { params });
    return data;
  }

  const { data } = await clientFetch.get<Response>(url, { params });
  return data;
}

type Response = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Trip[];
};

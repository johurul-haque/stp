import { getAllTripsResponse } from '@/types/trips';
import { serverFetch } from '../axios/server-fetch';

export async function getAllTrips(params?: {
  _q?: string;
  _page?: string;
  is_public?: boolean;
}) {
  const { data } = await serverFetch.get<getAllTripsResponse>('/api/trips', {
    params,
  });
  return data;
}

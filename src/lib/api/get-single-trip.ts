import { Trip } from '@/types/trips';
import { serverFetch } from '../axios/server-fetch';

export async function getSingleTrip(tripId: string) {
  return await serverFetch.get<Trip>(`/api/trips/${tripId}`);
}

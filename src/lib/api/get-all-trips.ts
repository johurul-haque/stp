import { AllTripsResponse } from '@/types/trips';
import { serverFetch } from '../axios/server-fetch';

export async function getAllTrips() {
  const { data } = await serverFetch.get<AllTripsResponse>('/api/trips');
  return data;
}

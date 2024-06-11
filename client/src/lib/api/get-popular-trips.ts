import { Trip } from '@/types/trip';
import { clientFetch } from '../axios/client-fetch';

export function getPopularTrips() {
  return clientFetch.get<Trip[]>('/api/trips/popular');
}

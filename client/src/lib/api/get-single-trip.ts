import { Trip } from '@/types/trip';
import { serverFetch } from '../axios/server-fetch';

export async function getSingleTrip(tripId: string) {
  return await serverFetch.get<Response>(`/api/trips/${tripId}`);
}

type Response = Trip & {
  TravelPairRequest?: {
    id: string;
    tripId: string;
    userId: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
  }[];
};

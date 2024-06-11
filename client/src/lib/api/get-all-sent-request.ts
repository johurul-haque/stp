import { Trip } from '@/types/trip';
import { serverFetch } from '../axios/server-fetch';

export async function getAllSentRequests() {
  return serverFetch.get<Response>('/api/sent-requests');
}

type Response = {
  id: string;
  trip: Trip;
  tripId: string;
  userId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}[];

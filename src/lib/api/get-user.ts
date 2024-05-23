import { User } from '@/types/user';
import { serverFetch } from '../axios/server-fetch';

export async function getUser() {
  return serverFetch.get<User>('/api/profile');
}

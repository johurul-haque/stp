import { User } from '@/types/user';
import { serverFetch } from '../axios/server-fetch';

export async function getUser() {
  try {
    return await serverFetch.get<User>('/api/profile');
  } catch (error) {
    return null;
  }
}

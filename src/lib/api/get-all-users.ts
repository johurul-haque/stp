import { User } from '@/types/user';
import { serverFetch } from '../axios/server-fetch';

export async function getAllUsers() {
  return serverFetch.get<User[]>('/api/manage-users');
}

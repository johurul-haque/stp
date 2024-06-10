import { User } from '@/types/user';

export type LoginResponse = {
  user: User;
  access_token: string;
};

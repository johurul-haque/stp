import { User } from '@/types/user';

export type RegisterResponse = {
  user: User;
  access_token: string;
};

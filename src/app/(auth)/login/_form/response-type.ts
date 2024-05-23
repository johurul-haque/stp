export type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string | null;
    username: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  access_token: string;
};

export type ErrorResponse = {
  status: number;
  success?: false;
  message: string;
  error: unknown;
};

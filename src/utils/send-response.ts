import { Response } from 'express';

type Options<T> = {
  status?: number;
  success?: true;
  message: string;
  meta?: Record<string, unknown>;
  data?: T;
};

export function sendResponse<T>(
  res: Response,
  { status = 200, success = true, ...rest }: Options<T>
) {
  return res.status(status).json({
    success,
    ...rest,
  });
}

import { Response } from 'express';

type Options<T> = {
  statusCode?: number;
  success?: true;
  message: string;
  meta?: Record<string, unknown>;
  data?: T;
};

export function sendResponse<T>(
  res: Response,
  { statusCode = 200, success = true, ...rest }: Options<T>
) {
  return res.status(statusCode).json({
    success,
    statusCode,
    ...rest,
  });
}

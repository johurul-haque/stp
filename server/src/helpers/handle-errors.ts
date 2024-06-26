import { env } from '@/config/env';
import { ErrorResponse } from '@/interface/errors';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { AppError } from '@utils';
import { ZodError } from 'zod';

function getStack(stack: string | undefined) {
  return env.IS_DEV ? stack : undefined;
}

export function appError(error: AppError): ErrorResponse {
  return {
    status: error.status,
    message: error.message,
    error: { ...error, stack: getStack(error.stack) },
  };
}

export function serverError(error: Error): ErrorResponse {
  return {
    status: 500,
    message: error.message,
    error: { ...error, stack: getStack(error.stack) },
  };
}

export function zodError(error: ZodError): ErrorResponse {
  const issues = error.issues.map((issue) => {
    return {
      field: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    status: 403,
    message: 'Zod validation error',
    error: { issues },
  };
}

export function prismaKnownRequestError(
  error: PrismaClientKnownRequestError
): ErrorResponse {
  let sources: any[] = [];

  if (
    error.meta &&
    'target' in error.meta &&
    Array.isArray(error.meta.target)
  ) {
    sources = error.meta.target.map((path) => {
      return {
        path,
        message: `${path} already exists`,
      };
    });
  }

  return {
    status: 409,
    message: error.name,
    error: { ...error, stack: getStack(error.stack) },
  };
}

export function prismaValidationError(
  error: PrismaClientValidationError
): ErrorResponse {
  return {
    status: 403,
    message: error.name,
    error: {
      ...error,
      message: env.IS_DEV ? error.message : undefined,
      stack: getStack(error.stack),
    },
  };
}

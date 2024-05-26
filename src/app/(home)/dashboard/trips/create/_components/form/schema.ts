'use client';

import { z } from 'zod';

export const createTripFormSchema = z.object({
  destination: z.string(),
  description: z.string(),
  travel_type: z.string(),
  date: z.object(
    {
      from: z.date(requiredErr('start date.')),
      to: z.date(requiredErr('end date.')),
    },
    requiredErr('start and end date.')
  ),
  images: z
    .custom<File>()
    .refine(isValidImageFile, 'Invalid image format.')
    .refine(checkImageSize, 'Max image size is 10MB')
    .transform((fileList) => Object.values(fileList) as File[]),
});

export type createTripFormSchema = z.infer<typeof createTripFormSchema>;

function requiredErr(value: string) {
  return {
    required_error: `Please select ${value}` as const,
  };
}

function isValidImageFile(fileList: File) {
  const filesArray = Object.values(fileList);
  const validFiles = filesArray.filter(
    (file) => file instanceof File && file.type?.startsWith('image/')
  );

  return validFiles.length === filesArray.length;
}

function checkImageSize(fileList: File) {
  const filesArray = Object.values(fileList);
  const validSize = filesArray.filter((file) => file.size <= 10 * 1024 * 1024);

  return validSize.length === filesArray.length;
}

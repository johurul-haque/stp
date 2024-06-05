import { z } from 'zod';

export const createTripFormSchema = z.object({
  destination: z.string({
    required_error: 'Please provide a destination of the trip.',
  }),
  description: z
    .any()
    .transform((value) => JSON.stringify(value))
    .refine(
      (val) => val.length > 60,
      'Description must be at least 40 characters.'
    ),
  travelType: z.string(),
  date: z.object(
    {
      from: z.date(requiredErr('start date of the trip.')),
      to: z.date(requiredErr('end date of the trip.')),
    },
    requiredErr('start and end date of the trip.')
  ),
  images: z
    .custom<File[]>()
    .transform((fileList) => Object.values(fileList || {}))
    .refine(isValidImageFile, 'Invalid image format.')
    .refine(checkImageSize, 'Max size per image is 7MB.')
    .refine(
      (files) => files.length < 7,
      'You can upload a maximum of 7 images.'
    ),
});

export type createTripFormSchema = z.infer<typeof createTripFormSchema>;

function requiredErr(value: string) {
  return {
    required_error: `Please select ${value}` as const,
  };
}

export function isValidImageFile(fileList: File[]) {
  const validFiles = fileList.filter(
    (file) => file instanceof File && file.type?.startsWith('image/')
  );

  return validFiles.length === fileList.length;
}

function checkImageSize(fileList: File[]) {
  const validSize = fileList.filter((file) => file.size <= 7 * 1024 * 1024);

  return validSize.length === fileList.length;
}

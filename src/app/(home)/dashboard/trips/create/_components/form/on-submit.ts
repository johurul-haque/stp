import { createTripFormSchema } from './schema';

export function onSubmit(values: createTripFormSchema) {
  console.log(values);
}

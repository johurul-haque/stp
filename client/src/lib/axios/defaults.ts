import { CreateAxiosDefaults } from 'axios';

export const axiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  transformResponse: (response) => {
    const result = JSON.parse(response);

    if (result?.success) {
      if (result.meta) {
        return { meta: result.meta, data: result.data };
      }

      return result.data;
    }

    return result;
  },
} satisfies CreateAxiosDefaults<any>;

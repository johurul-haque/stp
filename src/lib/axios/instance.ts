import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  transformResponse: (response) => {
    const result = JSON.parse(response);

    if (result?.success) {
      return result.data;
    }

    return result;
  },
});

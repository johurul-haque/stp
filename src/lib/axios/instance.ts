import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8080',
  transformResponse: (response) => {
    const result = JSON.parse(response);

    if (result?.success) {
      return result.data;
    }

    return result;
  },
});

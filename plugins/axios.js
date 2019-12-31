import axios from 'axios';

export default axios.create({
  baseURL: process.env.baseUrl,
  headers: {
    'x-api-key': process.env.apiKey,
  },
});

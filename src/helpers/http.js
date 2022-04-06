import axios from 'axios';

// const { NEXT_PUBLIC_BACKEND_URL } = process.env

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: 'http://192.168.0.193:8000',
    headers,
  });
};

export default http;

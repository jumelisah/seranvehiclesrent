import axios from 'axios';

// const { NEXT_PUBLIC_BACKEND_URL } = process.env

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: 'https://fw5-backend-beginner.herokuapp.com',
    headers,
  });
};

export default http;

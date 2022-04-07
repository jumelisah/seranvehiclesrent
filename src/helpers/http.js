import axios from 'axios';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: 'https://fw5-backend-beginner.herokuapp.com/',
    headers,
  });
};

export default http;

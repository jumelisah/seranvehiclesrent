import axios from 'axios';
// http://192.168.0.193:8000
// https://fw5-backend-beginner.herokuapp.com
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

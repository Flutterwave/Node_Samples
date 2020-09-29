import axios from "axios";

const instance = axios.create({
  baseURL: `http://localhost:3002/`
});

instance.interceptors.request.use(config => {
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Do something with response data
    return Promise.reject(error);
  }
);

export default instance;

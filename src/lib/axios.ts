import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://assignment.stage.crafto.app',
});

axios.interceptors.request.use(
  function (config) {
    // const token = cookie.get('token');
    // if (token && token.value) config.headers.Authorization = token.value;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axios;

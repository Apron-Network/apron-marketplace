import axios from 'axios';
// import store from '@/store';
// import router from '@/router';

let instance;

const axiosInstance = () => {
  if (!instance) {
    instance = axios.create({
      timeout: 10000,
      // withCredentials: true,
      responseType: 'json',
    });
  }
  // instance.interceptors.request.use((request) => request);
  instance.interceptors.response.use(
    (response) => response.data ? response.data : response
    , (err) => console.log(err)
    ,
  );

  return instance;
};

const  {mainAddress} = window;

const host = `${document.location.protocol}//${mainAddress.basepath}:8082/`;

const get = urlMethod => axiosInstance(host + urlMethod).get(host + urlMethod);

const post = (urlMethod, payload) => axiosInstance(host + urlMethod).post(host + urlMethod, payload);


export default {
  get,
  post,
};

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
  instance.interceptors.request.use((request) => {
    // store.state.isloadingShow = true;
    return request;
  });
  instance.interceptors.response.use(
    (response) => {
      // store.state.isloadingShow = false;

      return response.data ? response.data : response;
    }, (err) => {
      if (err.response && err.response.status === 405) {
        // router.push('/loginRegister/login');
        // store.state.isloadingShow = false;
      }
    },
  );

  return instance;
};


const host = `${document.location.protocol}//47.245.33.199:8082/`;

const get = urlMethod => axiosInstance(host + urlMethod).get(host + urlMethod);

const post = (urlMethod, payload) => axiosInstance(host + urlMethod).post(host + urlMethod, payload);


export default {
  get,
  post,
};

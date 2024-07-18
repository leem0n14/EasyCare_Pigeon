import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

const service: AxiosInstance = axios.create({
  // baseURL: 'http://60.205.189.11:8081/', // 设置服务器的baseURL
  baseURL: 'http://47.113.109.240:8080/', // 设置服务器的baseURL
  // baseURL: 'http://47.113.109.240:8081/', // 设置服务器的baseURL
  // baseURL: 'http://172.21.160.114:8080/', // 设置默认的baseURL
  // baseURL:'http://localhost:8080',
//   baseURL: "http://172.21.160.114:8080/", // 设置默zwj认的baseURL
  timeout: 5000,
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    } else {
      Promise.reject();
    }
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject();
  }
);

export default service;

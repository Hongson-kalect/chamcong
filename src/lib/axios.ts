import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https//:ipays.vn/api",
  // baseURL: "/api",
  timeout: 5000,
  // headers: {
  //   Authentication: "Bearer " + getCookie("auth"),
  // },
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authentication = "Bearer " + "token";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const httpGet = async (pathname: string, params?: object) => {
  const data = await api.get(pathname, {
    params,
  });
  return data;
};

export const httpPost = async (pathname: string, body?: object) => {
  const data = await api.post(pathname, body);
  return data;
};

import axios from "axios";

const api = axios.create({
  // 192.168.110.120
  baseURL: "https://ipays.vn/api", // URL cơ sở cho các yêu cầu
});

// Thêm request interceptor để ghi lại thời gian bắt đầu
api.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() }; // Ghi lại thời gian bắt đầu
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm response interceptor để ghi lại thời gian kết thúc và tính toán thời gian xử lý
api.interceptors.response.use(
  (response) => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime; // Tính thời gian xử lý
    console.log(`Request to ${response.config.url} took ${duration} ms`);
    return response;
  },
  (error) => {
    const endTime = new Date();
    const duration = endTime - error.config.metadata.startTime; // Tính thời gian xử lý
    console.error(`Request to ${error.config.url} fails took ${duration} ms`);
    return Promise.reject(error);
  }
);

export default api;

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

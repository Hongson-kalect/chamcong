import { useAppStore } from "@/store/app.store";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useAxios = () => {
  const { userInfo } = useAppStore();
  const baseUrl = useMemo(() => {
    return "https://ipays.vn/api";
  }, []);
  const [api] = useState(() =>
    axios.create({ baseURL: baseUrl, timeout: 5000 })
  );

  useEffect(() => {
    // api.interceptors.response.use(
    //   (response) => {
    //     const endTime = new Date();
    //     const duration = endTime - response.config.metadata.startTime; // Tính thời gian xử lý
    //     console.log(`Request to ${response.config.url} took ${duration} ms`);
    //     return response;
    //   },
    //   (error) => {
    //     const endTime = new Date();
    //     const duration = endTime - error.config.metadata.startTime; // Tính thời gian xử lý
    //     console.error(
    //       `Request to ${error.config.url} fails took ${duration} ms`
    //     );
    //     return Promise.reject(error);
    //   }
    // );

    api.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        // config.headers.Authentication = "Bearer " + userInfo.access_token;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userInfo.access_token}`;
  }, [userInfo]);

  const httpGet = useCallback(async (pathname: string, params?: object) => {
    const data = await api.get(pathname, {
      params,
    });
    return data;
  }, []);

  const httpPost = useCallback(async (pathname: string, body?: object) => {
    const data = await api.post(pathname, body);
    return data;
  }, []);

  // const httpGet = async (pathname: string) => {
  //     const data = await api.get(pathname);
  //     return data;
  // }

  return { httpGet, httpPost, api };
};

export default useAxios;

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
    api.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers.Authentication = "Bearer " + userInfo.access_token;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
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

  return { httpGet, httpPost };
};

export default useAxios;

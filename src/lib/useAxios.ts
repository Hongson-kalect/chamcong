import axios from "axios";
import { useCallback, useMemo, useState } from "react";

export const useAxios = () => {
  const baseUrl = useMemo(() => {
    return "https://ipays.vn/api";
  }, []);
  const [api] = useState(() =>
    axios.create({ baseURL: baseUrl, timeout: 5000 })
  );

  const httpPost = useCallback(async (pathname: string) => {
    const data = await api.get(pathname);
    return data;
  }, []);

  const httpGet = useCallback(async (pathname: string) => {
    const data = await api.get(pathname);
    return data;
  }, []);

  // const httpGet = async (pathname: string) => {
  //     const data = await api.get(pathname);
  //     return data;
  // }

  return [httpGet, httpPost];
};

export default useAxios;

import { httpGet, httpPost } from "@/lib/axios";
import useAxios from "@/lib/useAxios";
import { useAppStore } from "@/store/app.store";
import { useCallback } from "react";

export const useApi = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { httpGet, httpPost } = useAxios();
  const login = useCallback(async () => {
    const res = await httpPost("zlogin", { zalo_id: userInfo.zalo_id });
    return res.data;
  }, [userInfo]);

  const register = useCallback(async () => {
    const body = {
      username: userInfo.zalo_id,
      password: userInfo.zalo_id,
      email: userInfo.zalo_id,
      zalo_name: userInfo.name,
      zalo_id: userInfo.zalo_id,
    };
    const res = await httpPost("register", body);
    return res.data;
  }, [userInfo]);

  return { login, register };
};

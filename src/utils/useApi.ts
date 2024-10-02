import { httpGet, httpPost } from "@/lib/axios";
import useAxios from "@/lib/useAxios";
import { useAppStore } from "@/store/app.store";
import { useCallback } from "react";

export const useApi = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { httpGet, httpPost, api } = useAxios();

  const login = useCallback(
    async (zalo_id: string) => {
      console.log("id", userInfo);
      const res = await httpPost("zlogin/", { zalo_id });
      return res.data;
    },
    [userInfo]
  );

  const register = useCallback(
    async (userInfo) => {
      const body = {
        username: userInfo.id,
        password: userInfo.id,
        email: userInfo.id + "@gmail.com",
        zalo_name: userInfo.name,
        zalo_id: userInfo.id,
      };
      const res = await httpPost("register/", body);
      return res.data;
    },
    [userInfo]
  );

  return { login, register };
};

import { httpGet, httpPost } from "@/lib/axios";
import useAxios from "@/lib/useAxios";
import { useAppStore } from "@/store/app.store";
import { useCallback } from "react";

export const useHomeApi = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { httpGet, httpPost, api } = useAxios();

  const login = useCallback(async () => {
    const res = await api.post("zlogin", { zalo_id: userInfo.zalo_id });
    return res.data;
  }, [userInfo]);

  const getWorkShift = useCallback(async () => {
    const res = await httpGet("tuchamcong/?page_size=1&page=1");
    return res.data;
  }, [userInfo]);

  const createWorkShift = useCallback(
    async (props: { tencongty: string; chucvu: string }) => {
      const res = await httpPost("tuchamcong/", { props });
      return res.data;
    },
    [userInfo]
  );

  const checkDate = useCallback(
    async (props: {
      ca: string;
      kieungay: string;
      giovao: string;
      giora: string;
      tuchamcong: number;
    }) => {
      const res = await httpPost("tuchamcongtay/", props);
      return res.data;
    },
    [userInfo]
  );
  const offDate = useCallback(
    async (props: { kieunghi: string; tuchamcong: number }) => {
      const res = await httpPost("tuchamcongtay/", props);
      return res.data;
    },
    [userInfo]
  );
  return { createWorkShift, getWorkShift, checkDate, offDate };
};

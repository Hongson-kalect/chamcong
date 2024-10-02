import { httpGet, httpPost } from "@/lib/axios";
import useAxios from "@/lib/useAxios";
import { useAppStore } from "@/store/app.store";
import { useCallback } from "react";

export const useHomeApi = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { httpGet, httpPost } = useAxios();

  const login = useCallback(async () => {
    const res = await httpPost("zlogin", { zalo_id: userInfo.zalo_id });
    return res.data;
  }, [userInfo]);

  const getWorkShift = useCallback(async () => {
    const res = await httpGet("tuchamcong/?page_size=1&page=1");
    return res.data;
  }, [userInfo]);

  const createWorkShift = useCallback(
    async (props: { tencongty: string; chucvu: string }) => {
      const res = await httpPost("tuchamcong", { props });
      return res.data;
    },
    [userInfo]
  );

  return { createWorkShift, getWorkShift };
};

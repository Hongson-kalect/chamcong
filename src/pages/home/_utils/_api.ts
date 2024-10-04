import { httpGet, httpPost } from "@/lib/axios";
import useAxios from "@/lib/useAxios";
import { getFirstAndLastDayOfMonth } from "@/lib/utils";
import { useAppStore } from "@/store/app.store";
import { useCallback } from "react";

export const useHomeApi = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { httpGet, httpPost, httpDelete, httpPut, httpPatch, api } = useAxios();

  const login = useCallback(async () => {
    const res = await api.post("zlogin", { zalo_id: userInfo.zalo_id });
    return res.data;
  }, [userInfo]);

  const getMonthCheckInfo = useCallback(
    async (month?: number, year?: number) => {
      const date = new Date();
      const { firstDay, lastDay } = getFirstAndLastDayOfMonth(
        year || date.getFullYear(),
        month || date.getMonth() + 1
      );
      const res = await httpGet("tuchamcongtay/", {
        ngay_after: firstDay,
        ngay_before: lastDay,
      });
      return res.data?.results || [];
    },
    [userInfo]
  );

  const getWorkShift = useCallback(async () => {
    const res = await httpGet("tuchamcong/?page_size=1&page=1");
    return res?.data?.results[0];
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
      ca?: number;
      kieungay?: number;
      ngay: string;
      giovao: string;
      giora: string;
      tuchamcong: number;
    }) => {
      const res = await httpPost("tuchamcongtay/", props);
      return res.data;
    },
    [userInfo]
  );
  const editCheckDate = useCallback(
    async (props: {
      ca?: number;
      kieungay?: number;
      giovao: string;
      giora: string;
      tuchamcong: number;
      id: number;
    }) => {
      const res = await httpPatch(`tuchamcongtay/${props.id}/`, props);
      return res.data;
    },
    [userInfo]
  );
  const offDate = useCallback(
    async (props: { ngay: string; kieungay?: number; tuchamcong: number }) => {
      const res = await httpPost("tuchamcongtay/", { ...props, dilam: false });
      return res.data;
    },
    [userInfo]
  );
  const editOffDate = useCallback(
    async (props: { ngay: string; kieungay: number; tuchamcong: number }) => {
      const res = await httpPut("tuchamcongtay/", { ...props, dilam: false });
      return res.data;
    },
    [userInfo]
  );
  const cancelState = useCallback(
    async (props: { machamcong: number }) => {
      const res = await httpDelete(`tuchamcongtay/${props.machamcong}/`);
      return res.data;
    },
    [userInfo]
  );
  return {
    createWorkShift,
    getWorkShift,
    checkDate,
    editCheckDate,
    editOffDate,
    offDate,
    cancelState,
    getMonthCheckInfo,
  };
};

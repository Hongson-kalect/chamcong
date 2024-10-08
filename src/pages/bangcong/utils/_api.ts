import { httpGet, httpPost } from "@/lib/axios";
import useAxios from "@/lib/useAxios";
import { getFirstAndLastDayOfMonth } from "@/lib/utils";
import { IHeSo, IKieuCa, IKieuNgay } from "@/pages/home/_utils/_interface";
import homeQuery from "@/pages/home/_utils/_query";
import { useAppStore } from "@/store/app.store";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useBangCongApi = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { workShiftQuery } = homeQuery();
  const { httpGet, httpPost, httpDelete, httpPut, httpPatch, api } = useAxios();

  const taoKieuca = useCallback(
    async (props: IKieuCa) => {
      if (!workShiftQuery?.data?.id)
        return toast.error("Chua co bang cong nao");
      try {
        const date = new Date();

        const res = await httpPost("kieuca/", {
          ...props,
          tuchamcong: workShiftQuery.data.id,
        });
        return res.data?.results || [];
      } catch (error) {
        return toast.error("Khong them dc kieu ca");
      }
    },
    [userInfo]
  );
  const suaKieuca = useCallback(
    async (props: IKieuCa) => {
      if (!workShiftQuery?.data?.id)
        return toast.error("Chua co bang cong nao");
      try {
        const date = new Date();

        const res = await httpPatch("kieuca/", {
          ...props,
          tuchamcong: workShiftQuery.data.id,
        });
        return res.data?.results || [];
      } catch (error) {
        return toast.error("Khong the sua kieu ca");
      }
    },
    [userInfo]
  );

  const taoKieungay = useCallback(
    async (props: IKieuNgay) => {
      if (!workShiftQuery?.data?.id)
        return toast.error("Chua co bang cong nao");
      try {
        const res = await httpPost("kieungay/", {
          ...props,
          ngaytrongtuan: JSON.stringify(props.ngaytrongtuan),
          tuchamcong: workShiftQuery.data.id,
        });
        return res.data?.results || [];
      } catch (error) {
        return toast.error("Khong them dc kieu ngay");
      }
    },
    [userInfo]
  );
  const suaKieungay = useCallback(
    async (props: IKieuNgay) => {
      if (!workShiftQuery?.data?.id)
        return toast.error("Chua co bang cong nao");
      try {
        const date = new Date();

        const res = await httpPatch("kieungay/", {
          ...props,
          ngaytrongtuan: JSON.stringify(props.ngaytrongtuan),
          tuchamcong: workShiftQuery.data.id,
        });
        return res.data?.results || [];
      } catch (error) {
        return toast.error("Khong the sua kieu ngay");
      }
    },
    [userInfo]
  );

  const taoHeso = useCallback(
    async (props: IHeSo) => {
      if (!workShiftQuery?.data?.id)
        return toast.error("Chua co bang cong nao");
      try {
        const date = new Date();

        const res = await httpPost("heso/", {
          ...props,
          tuchamcong: workShiftQuery.data.id,
        });
        return res.data?.results || [];
      } catch (error) {
        return toast.error("Khong them dc he so");
      }
    },
    [userInfo]
  );
  const suaHeso = useCallback(
    async (props: IHeSo) => {
      if (!workShiftQuery?.data?.id)
        return toast.error("Chua co bang cong nao");
      try {
        const date = new Date();

        const res = await httpPatch("heso/", {
          ...props,
          tuchamcong: workShiftQuery.data.id,
        });
        return res.data?.results || [];
      } catch (error) {
        return toast.error("Khong the sua he so");
      }
    },
    [userInfo]
  );
  return {
    taoKieungay,
    suaKieungay,
    taoKieuca,
    suaKieuca,
    taoHeso,
    suaHeso,
  };
};

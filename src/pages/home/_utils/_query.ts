import { useAppStore } from "@/store/app.store";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useHomeStore } from "./_store";
import { useHomeApi } from "./_api";
import { WorkDateType, WorkPageType } from "./_interface";
import { useEffect } from "react";

export const homeQuery = () => {
  const { userInfo } = useAppStore();
  const { getWorkShift, getMonthCheckInfo } = useHomeApi();
  const { setKieuCa, setKieuNgay } = useHomeStore();

  const workShiftQuery = useQuery<WorkPageType>({
    queryFn: getWorkShift,
    queryKey: ["getWorkShift", userInfo],
  });

  const monthWorkQuery = useQuery<WorkDateType[]>({
    queryFn: async () => await getMonthCheckInfo(),
    queryKey: ["monthWorkInfo"],
  });

  useEffect(() => {
    console.log("workShiftQuery :>> ", workShiftQuery);
    setKieuCa(workShiftQuery?.data?.kieucas || []);
    setKieuNgay(workShiftQuery?.data?.kieungays || []);
  }, [workShiftQuery.data]);

  return { workShiftQuery, monthWorkQuery };
};

export default homeQuery;

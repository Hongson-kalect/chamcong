import UserHeader from "@/components/userheader";
import { getDate, scrollToElement } from "@/lib/utils";
import * as React from "react";
import { FaArrowDown } from "react-icons/fa6";
import PayItem from "../components/payItem";
import { useNavigate } from "zmp-ui";
import { Empty } from "antd";
import homeQuery from "../_utils/_query";
import { useHomeApi } from "../_utils/_api";
import { useAppStore } from "@/store/app.store";
import { useHomeStore } from "../_utils/_store";
import { WorkDateType } from "../_utils/_interface";
import { toast } from "react-toastify";
import TodayStatus from "./todayStatus";

export interface ITodayInfoProps {}

export default function TodayInfo(props: ITodayInfoProps) {
  const naviagte = useNavigate();
  const { workShiftQuery: workShifts, monthWorkQuery: monthWorkInfo } =
    homeQuery();
  // const workShifts = workShiftQuery();
  const { getWorkShift, getMonthCheckInfo, cancelState } = useHomeApi();
  const { userInfo, setPopup } = useAppStore();

  const [dayCheckPopup, setDayCheckPopup] = React.useState(false);
  const { workPage, setWorkPage } = useHomeStore();
  const [createWorkPage, setCreateWorkPage] = React.useState(false);
  const [action, setAction] = React.useState<
    "check" | "editCheck" | "editOff" | "off" | "reset" | null
  >(null);

  const [todayInfo, setTodayInfo] = React.useState<WorkDateType | null>(null);

  const sendData = (workpage) => {
    setWorkPage(workpage);
    setCreateWorkPage(false);
  };

  const handleCancelState = async () => {
    if (!workPage?.id) return toast.error("Chưa có bảng lương nào đc chọn");
    if (!todayInfo?.id) return toast.error("Chưa có ngay nào đc chọn");
    try {
      if (window.confirm("Bạn có chắc muốn hủy?"))
        await cancelState({
          machamcong: todayInfo.id,
        });
    } catch (error) {
      alert("Ai cho ma huy" + JSON.stringify(error));
    }
  };

  React.useEffect(() => {
    console.log("workShift", workShifts, workShifts.status);
    if (workShifts.status === "pending") return; //dang load hoac load loi
    console.log("workShift.data", workShifts.data);
    if (!workShifts.data) {
      setCreateWorkPage(true);
    } else {
      setWorkPage(workShifts.data);
    }
  }, [workShifts.status]);

  React.useEffect(() => {
    if (monthWorkInfo.isPending) return;
    const today =
      monthWorkInfo.data?.find((item) => {
        return item.ngay === getDate();
      }) || null;
    if (today) setTodayInfo({ ...today });
    else setTodayInfo(null);
  }, [monthWorkInfo.data]);

  console.log("todayInfo", todayInfo);
  console.log("workMonth", monthWorkInfo);

  if (monthWorkInfo.isPending) return <div>Loading</div>;

  return (
    <div className="h-screen snap-start relative">
      <div className="h-52 pt-8 bg-blue-600 rounded-b-[32px]">
        <UserHeader />
      </div>
      <div className="content px-4 -mt-24">
        <TodayStatus />

        {todayInfo ? (
          <>
            <div className="flex items-center justify-between mt-10">
              <p className="font-medium text-sm text-gray-500">
                Công việc hôm nay
              </p>
              <p className="font-medium text-green-600 text-xl">+ 234.567 đ</p>
            </div>
            <div className="wage-list py-4 flex flex-col gap-3 px-1">
              <DayPay todayInfo={todayInfo} />
            </div>
          </>
        ) : (
          <div className="text-center mt-4 bg-whtie">
            <Empty description={"Hom nay chua cham"}></Empty>
          </div>
        )}
      </div>
      <button
        onClick={() => scrollToElement("month-info")}
        className="absolute bottom-10 right-4 h-10 w-10 bg-blue-500 opacity-50 text-white rounded-full flex items-center justify-center"
      >
        <FaArrowDown />
      </button>
    </div>
  );
}

export const DayPay = ({ todayInfo }: { todayInfo: WorkDateType }) => {
  const { workShiftQuery } = homeQuery();

  const heso = React.useMemo(() => {
    const tHeso = workShiftQuery.data?.hesos?.find(
      (item) =>
        item.kieungay === todayInfo.kieungay && item.kieuca === todayInfo.ca
    );
    return tHeso;
  }, [workShiftQuery.data, todayInfo]);

  const bangluong = React.useMemo(() => {
    return workShiftQuery.data?.bangluong?.[0];
  }, [workShiftQuery.data]);

  const luongcoban = React.useMemo(() => {
    if (!bangluong || !workShiftQuery.data || !todayInfo?.giolam) return 0;
    return Math.floor(
      (bangluong.luong / 26 / 8) *
        (Math.floor(
          (todayInfo.giolam * 60 -
            (todayInfo.densom || 0) -
            (todayInfo.vaomuon || 0) -
            (todayInfo.vesom || 0) -
            (todayInfo.tangca || 0)) /
            6
        ) /
          10)
    );
  }, [workShiftQuery.data, todayInfo]);

  const densom = React.useMemo(() => {
    if (!bangluong || !workShiftQuery.data || !todayInfo?.densom) return 0;
    return Math.floor(
      (bangluong.luong / 26 / 8 / 60) * (todayInfo.densom || 0)
    ); //phut
  }, [workShiftQuery.data, todayInfo]);

  const vaomuon = React.useMemo(() => {
    if (!bangluong || !workShiftQuery.data || !todayInfo?.vaomuon) return 0;
    return -Math.floor(
      (bangluong.luong / 26 / 8 / 60) * (todayInfo.vaomuon || 0)
    );
  }, [workShiftQuery.data, todayInfo]);

  const vesom = React.useMemo(() => {
    if (!bangluong || !workShiftQuery.data || !todayInfo?.vesom) return 0;
    return -Math.floor(
      (bangluong.luong / 26 / 8 / 60) * (todayInfo.vesom || 0)
    );
  }, [workShiftQuery.data, todayInfo]);

  const tangca = React.useMemo(() => {
    if (!bangluong || !workShiftQuery.data || !todayInfo?.tangca) return 0;
    return Math.floor(
      (bangluong.luong / 26 / 8 / 60) * (todayInfo.tangca || 0) * 1.5
    );
  }, [workShiftQuery.data, todayInfo]);

  return (
    <div className="py-4 flex flex-col gap-3 px-2">
      <PayItem
        name="Luong co ban"
        time={
          Math.floor(
            ((todayInfo?.giolam || 0) * 60 -
              (todayInfo.densom || 0) -
              (todayInfo.vaomuon || 0) -
              (todayInfo.vesom || 0) -
              (todayInfo.tangca || 0)) /
              6
          ) /
            10 +
          " Giờ"
        }
        value={luongcoban}
      />
      {densom ? (
        <PayItem
          name="Den som"
          time={todayInfo.densom + " Phút"}
          value={densom}
        />
      ) : null}
      {vaomuon ? (
        <PayItem
          name="vaomuon"
          time={todayInfo.vaomuon + " Phút"}
          value={vaomuon}
        />
      ) : null}
      {vesom ? (
        <PayItem name="vesom" time={todayInfo.vesom + " Phút"} value={vesom} />
      ) : null}
      {tangca ? (
        <PayItem
          name="tangca"
          time={todayInfo.tangca + " Phút"}
          value={tangca}
        />
      ) : null}
    </div>
  );
};

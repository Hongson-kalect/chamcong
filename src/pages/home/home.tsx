import { useAppStore } from "@/store/app.store";
import { removeCache } from "@/store/native.store";
import * as React from "react";
import { Button, useNavigate } from "zmp-ui";
import { useHomeApi } from "./_utils/_api";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input } from "antd";
import { PopupWrapper } from "../taobangcong/popup/workShiftDetail";
import CreateWorkPage from "./popup/createWorkpage";
import { WorkDateType, WorkPageType } from "./_utils/_interface";

import { BsClipboardCheckFill } from "react-icons/bs";
import { PiCalendarXFill } from "react-icons/pi";
import CheckAction from "./popup/checkAction";
import OffAction from "./popup/offAction";
import { useHomeStore } from "./_utils/_store";
import { getDate } from "@/lib/utils";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import EditCheckAction from "./popup/editCheckAction";
import BangCong from "./ui/bangcong";
import { homeQuery } from "./_utils/_query";
import TodayStatus from "./ui/todayStatus";
import DayCheck from "./popup/dayCheck";
import SideBar from "@/layout/sidebar";
import UserHeader from "@/components/userheader";
import { StatusBarType } from "zmp-sdk";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const navigate = useNavigate();
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
    <div className="h-screen bg-white snap-y snap-mandatory overflow-y-scroll ">
      <SideBar />
      <div className="h-screen snap-start">
        <div className="h-52 pt-8 bg-blue-600 rounded-b-[32px]">
          <UserHeader />
        </div>
        <div className="content px-4 -mt-24">
          <div className="h-44 rounded-xl flex flex-col justify-between shadow-md shadow-gray-400 bg-white p-4">
            <div className="flex gap-3">
              <div
                className="calendar text-center px-1 py-0.5 rounded shadow-md shadow-gray-800"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <p className=" text-gray-500">
                  {new Date().getDay()
                    ? "Thu " + new Date().getDay()
                    : "Chu nhat"}
                </p>
                <p className="text-2xl font-medium text-blue-900">
                  {new Date().getDate()}
                </p>
                <p className="text-blue-200 text-xs">
                  Thang {new Date().getMonth() + 1}
                </p>
              </div>
              <div
                className="flex-1 flex items-center p-2 gap-4 shadow-md shadow-gray-800 rounded"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <div className="h-10 w-10 bg-red-200 rounded"></div>
                <p className="flex-1">
                  Nay di lam chu? Cham cong nao ban oi :V
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button className="rounded-xl bg-blue-600 shadow shadow-blue-400 text-white h-10 flex-1">
                Chấm công
              </button>
              <button className="rounded-xl bg-red-500 text-white h-10 w-28 shadow shadow-red-400">
                Nghỉ
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-10">
            <p className="font-medium text-sm text-gray-500">
              Công việc hôm nay
            </p>
            <p className="font-medium text-green-600 text-xl">+ 234.567 đ</p>
          </div>
          <div className="wage-list py-4 flex flex-col gap-5 px-1">
            <PayItem name="Lương cơ bản" amount={234567} time={8} />
            <PayItem name="Lương cơ bản" amount={234567} time={8} />
            <PayItem name="Lương cơ bản" amount={234567} time={8} />
            <PayItem name="Lương cơ bản" amount={-234567} time={8} />
          </div>
        </div>
      </div>

      <div className="min-h-[100vh] px-4 pt-8 flex flex-col snap-start">
        <BangCong
          dayInfos={monthWorkInfo.data}
          year={2024}
          month={new Date().getMonth()}
        />
        <div className="flex-1 flex flex-col">
          {/* <div className="flex items-center justify-between mt-10">
            <p className="font-medium text-sm text-gray-500">Chi tiết ngày</p>
            <p className="font-medium text-green-600 text-xl">+ 234.567 đ</p>
          </div> */}
          <div className="flex-1 flex items-center justify-center">
            <Empty description={"Hom nay chua cham"}></Empty>
          </div>
        </div>
      </div>

      <div className="h-40 bg-blue-950 snap-start min-h-screen">
        <TodayStatus />

        {!!todayInfo ? (
          <TodayInfo dayInfo={todayInfo} />
        ) : (
          <div className="text-center mt-4 bg-whtie">
            <Empty description={"Hom nay chua cham"}></Empty>
          </div>
        )}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between px-2">
            <div className="text-gray-600 font-medium text-sm">Bảng công</div>
            <div className="text-gray-600 font-medium text-sm">Chi tiết</div>
          </div>
          <BangCong
            dayInfos={monthWorkInfo.data}
            year={2024}
            month={new Date().getMonth()}
          />
        </div>
      </div>

      {/* Popup */}

      {createWorkPage ? (
        <PopupWrapper onClose={() => alert("close popup")}>
          <CreateWorkPage sendData={sendData} />
        </PopupWrapper>
      ) : null}

      {/* {action === "check" ? (
        <PopupWrapper onClose={() => setAction(null)}>
          <CheckAction onClose={() => setAction(null)} />
        </PopupWrapper>
      ) : null}
      {action === "editCheck" ? (
        <PopupWrapper onClose={() => setAction(null)}>
          <EditCheckAction
            todayInfo={todayInfo}
            onClose={() => {
              setAction(null);
              monthWorkInfo.refetch();
            }}
          />
        </PopupWrapper>
      ) : null}
      {action === "off" ? (
        <PopupWrapper onClose={() => setAction(null)}>
          <OffAction onClose={() => alert("close popup")} />
        </PopupWrapper>
      ) : null}
      {action === "editOff" ? (
        <PopupWrapper onClose={() => setAction(null)}>
          <OffAction onClose={() => alert("close popup")} />
        </PopupWrapper>
      ) : null} */}
    </div>
  );
}

const TodayInfo = ({ dayInfo }: { dayInfo: WorkDateType }) => {
  const { workShiftQuery } = homeQuery();

  console.log("workShiftQuery", workShiftQuery);
  console.log("dayInfo", dayInfo);

  const tenca = React.useMemo(() => {
    if (!workShiftQuery?.data) return;
    return (
      workShiftQuery.data?.kieucas?.find((item) => {
        return item.id === dayInfo.ca;
      })?.tenca || ""
    );
  }, [workShiftQuery.data, dayInfo]);

  const kieungay = React.useMemo(() => {
    if (!workShiftQuery?.data) return;
    return (
      workShiftQuery.data?.kieungays?.find((item) => {
        return item.id === dayInfo.kieungay;
      })?.tenloaingay || ""
    );
  }, [workShiftQuery.data, dayInfo]);
  return (
    <div className="mt-6 px-4 ">
      <div className="bg-white rounded-lg px-2 py-1 shadow shadow-gray-600">
        <div className="flex gap-4 items-center">
          <div className="text-lg text-gray-700 font-medium">
            {kieungay || "Chua chon kieu ngay"}
          </div>
          <div className="italic bg-yellow-700 text-white text-xs px-2 py-1 rounded-[50%]">
            {tenca || "null"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="gap-2 flex items-center justify-center">
            <p className="font-medium text-sm text-gray-500">Gio vao</p>
            <div className="font-medium  text-lg px-3 py-1 flex items-center justify-center bg-blue-500 text-white rounded-lg">
              {dayInfo.giovao.slice(11, 16)}
            </div>
          </div>
          <div className="gap-2 flex items-center justify-center">
            <p className="font-medium text-sm text-gray-500">Gio ra</p>
            <div className="font-medium  text-lg px-3 py-1 flex items-center justify-center bg-blue-500 text-white rounded-lg">
              {dayInfo.giora.slice(11, 16)}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-medium text-gray-500">Thu nhap hom nay</p>

          <TodayPay todayInfo={dayInfo} />
        </div>
      </div>
    </div>
  );
};

const TodayPay = ({ todayInfo }: { todayInfo: WorkDateType }) => {
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
    <div className="my-3 flex flex-col gap-4 px-2">
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
          ) / 10
        }
        amount={luongcoban}
      />
      {densom ? (
        <PayItem
          name="Den som"
          time={Math.floor((todayInfo.densom * 10) / 60) / 10}
          amount={densom}
        />
      ) : null}
      {vaomuon ? (
        <PayItem
          name="vaomuon"
          time={Math.floor((todayInfo.vaomuon * 10) / 60) / 10}
          amount={vaomuon}
        />
      ) : null}
      {vesom ? (
        <PayItem
          name="vesom"
          time={Math.floor((todayInfo.vesom * 10) / 60) / 10}
          amount={vesom}
        />
      ) : null}
      {tangca ? (
        <PayItem
          name="tangca"
          time={Math.floor((todayInfo.tangca * 10) / 60) / 10}
          amount={tangca}
        />
      ) : null}
    </div>
  );
};

type PayItem = {
  name: string;
  time?: number;
  amount: number;
};
const PayItem = (props: PayItem) => {
  const sub = React.useMemo(() => {
    return props.amount < 0;
  }, [props]);
  return (
    <div
      className={`h-14 flex items-center justify-between gap-2 px-4 py-2 rounded-xl shadow-md ${
        sub ? "bg-pink-50 shadow-red-200" : " shadow-gray-500"
      }`}
    >
      <div className="flex gap-2">
        <div
          className={`h-10 w-10 rounded-full ${
            sub ? "bg-red-400" : "bg-green-600"
          }`}
        ></div>
        <div className="flex flex-col">
          <p className="uppercase text-sm">{props.name}</p>
          <p className="text-gray-400 text-sm -mt-0.5">
            {props.time && props.time + "H"}
          </p>
        </div>
      </div>
      <div className={`${sub ? "text-red-600" : "text-green-600"} font-medium`}>
        {props.amount && props.amount + " đ"}
      </div>
    </div>
  );
};

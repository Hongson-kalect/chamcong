import { useAppStore } from "@/store/app.store";
import { removeCache } from "@/store/native.store";
import * as React from "react";
import { Button, useNavigate } from "zmp-ui";
import { useHomeApi } from "./_utils/_api";
import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { PopupWrapper } from "../taobangcong/popup/workShiftDetail";
import CreateWorkPage from "./popup/createWorkpage";
import { WorkPageType } from "./_utils/_interface";

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

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const navigate = useNavigate();
  const { workShiftQuery: workShifts, monthWorkQuery: monthWorkInfo } =
    homeQuery();
  // const workShifts = workShiftQuery();
  const { getWorkShift, getMonthCheckInfo, cancelState } = useHomeApi();
  const { userInfo, setPopup } = useAppStore();

  const [dayCheckPopup, setDayCheckPopup] = React.useState(false);
  const { workState, setWorkState, workPage, setWorkPage } = useHomeStore();
  const [createWorkPage, setCreateWorkPage] = React.useState(false);
  const [action, setAction] = React.useState<
    "check" | "editCheck" | "editOff" | "off" | "reset" | null
  >(null);

  const [todayInfo, setTodayInfo] = React.useState(() => {
    return {
      ngay: "2024/10/3",
      giovao: undefined,
      giora: undefined,
      ca: 0,
      kieungay: 0,
      kieunghi: 0,
      id: 0,
    };
  });

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
      setWorkState(null);
    } catch (error) {
      alert("Ai cho ma huy" + JSON.stringify(error));
    }
  };

  React.useEffect(() => {
    console.log("workPage", workShifts);
    if (workShifts.status === "pending" || !workShifts.data?.results) return; //dang load hoac load loi
    if (workShifts.data?.results?.length === 0) {
      setCreateWorkPage(true);
    } else {
      setWorkPage(workShifts.data?.results[0]);
    }
  }, [workShifts.data]);

  React.useEffect(() => {
    console.log("monthWorkInfo :>> ", monthWorkInfo.data, getDate());
    if (monthWorkInfo.isPending || !monthWorkInfo.data?.length) return;
    const today = monthWorkInfo.data.find((item) => {
      return (item.ngay = getDate());
    });
    if (today) setTodayInfo(today);
  }, [monthWorkInfo.data]);

  React.useEffect(() => {
    if (monthWorkInfo.isPending) return;
    if (todayInfo.giovao && todayInfo.giora) return setWorkState("checked");
    if (todayInfo.kieunghi) return setWorkState("dayOff");
    return setWorkState(null);
  }, [todayInfo]);

  console.log(
    "monthWorkInfo.isPending || loading",
    todayInfo,
    monthWorkInfo.isPending
  );

  if (monthWorkInfo.isPending) return <div>Loading</div>;

  return (
    <div className="h-full">
      <SideBar />
      <div className="h-40 bg-blue-800">
        <UserHeader />
        <TodayStatus />
        <div className="px-1 mt-4">
          <div className="text-gray-600 font-medium text-sm">Bảng công</div>
          <BangCong
            dayInfos={monthWorkInfo.data}
            year={2024}
            month={new Date().getMonth()}
          />
        </div>
      </div>

      {/* Popup */}

      {/* {createWorkPage ? (
        <PopupWrapper onClose={() => alert("close popup")}>
          <CreateWorkPage sendData={sendData} />
        </PopupWrapper>
      ) : null}

      {action === "check" ? (
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

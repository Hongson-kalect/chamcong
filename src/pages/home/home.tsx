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
import { PayItem } from "@/components/wageItem";
import TodayInfo from "./ui/todayInfo";
import MonthInfo from "./ui/monthInfo";
import TinhLuong from "./ui/tinhluong";

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
      <TodayInfo />

      <MonthInfo />
      <TinhLuong />

      <div className="h-40 bg-blue-950 snap-start min-h-screen">
        <TodayStatus />

        {!!todayInfo ? (
          <TodayInfo />
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

// const TodayInfo = ({ dayInfo }: { dayInfo: WorkDateType }) => {
//   const { workShiftQuery } = homeQuery();

//   console.log("workShiftQuery", workShiftQuery);
//   console.log("dayInfo", dayInfo);

//   const tenca = React.useMemo(() => {
//     if (!workShiftQuery?.data) return;
//     return (
//       workShiftQuery.data?.kieucas?.find((item) => {
//         return item.id === dayInfo.ca;
//       })?.tenca || ""
//     );
//   }, [workShiftQuery.data, dayInfo]);

//   const kieungay = React.useMemo(() => {
//     if (!workShiftQuery?.data) return;
//     return (
//       workShiftQuery.data?.kieungays?.find((item) => {
//         return item.id === dayInfo.kieungay;
//       })?.tenloaingay || ""
//     );
//   }, [workShiftQuery.data, dayInfo]);
//   return (
//     <div className="mt-6 px-4 ">
//       <div className="bg-white rounded-lg px-2 py-1 shadow shadow-gray-600">
//         <div className="flex gap-4 items-center">
//           <div className="text-lg text-gray-700 font-medium">
//             {kieungay || "Chua chon kieu ngay"}
//           </div>
//           <div className="italic bg-yellow-700 text-white text-xs px-2 py-1 rounded-[50%]">
//             {tenca || "null"}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-2 mt-4">
//           <div className="gap-2 flex items-center justify-center">
//             <p className="font-medium text-sm text-gray-500">Gio vao</p>
//             <div className="font-medium  text-lg px-3 py-1 flex items-center justify-center bg-blue-500 text-white rounded-lg">
//               {dayInfo.giovao.slice(11, 16)}
//             </div>
//           </div>
//           <div className="gap-2 flex items-center justify-center">
//             <p className="font-medium text-sm text-gray-500">Gio ra</p>
//             <div className="font-medium  text-lg px-3 py-1 flex items-center justify-center bg-blue-500 text-white rounded-lg">
//               {dayInfo.giora.slice(11, 16)}
//             </div>
//           </div>
//         </div>

//         <div className="mt-4">
//           <p className="font-medium text-gray-500">Thu nhap hom nay</p>

//           <TodayPay todayInfo={dayInfo} />
//         </div>
//       </div>
//     </div>
//   );
// };

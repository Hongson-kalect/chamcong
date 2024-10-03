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

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const navigate = useNavigate();
  const { getWorkShift, getMonthCheckInfo, cancelState } = useHomeApi();
  const { userInfo } = useAppStore();
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

  const workShiftQuery = useQuery({
    queryFn: getWorkShift,
    queryKey: ["getWorkShift", userInfo],
  });

  const monthWorkInfo = useQuery({
    queryFn: async () => await getMonthCheckInfo(),
    queryKey: ["monthWorkInfo"],
  });

  React.useEffect(() => {
    console.log("workPage", workShiftQuery);
    if (workShiftQuery.status === "pending" || !workShiftQuery.data?.results)
      return; //dang load hoac load loi
    if (workShiftQuery.data?.results?.length === 0) {
      setCreateWorkPage(true);
    } else {
      setWorkPage(workShiftQuery.data?.results[0]);
    }
  }, [workShiftQuery.data]);

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
      <div className="h-40 bg-blue-800">
        <div className="flex justify-between px-2 py-1 mb-2">
          <div className="user flex gap-4 items-center">
            <img className="h-10 w-10 rounded-full" src={userInfo.avatar} />
            <div>
              <p className="text-sm text-gray-400">Cong nhan</p>
              <p className="text-lg text-white font-semibold">Cong ty A</p>
            </div>
          </div>
          <div className="flex gap-2">
            <img className="h-10 w-10 rounded-full" src={userInfo.avatar} />
            <div className="h-10 w-4 rounded-lg bg-red-400" />
          </div>
        </div>
        <div className="px-2">
          <div className="bg-white rounded-t-lg h-40 shadow shadow-gray-700  flex flex-col">
            <div
              className="info flex flex-col flex-1 py-4 items-center justify-center gap-2"
              style={{ borderBottom: "1px solid #aaa" }}
            >
              <img src={userInfo.avatar} className="h-12 w-12" />
              <div>Cau chui the cua mieng cua thanh niena nao do</div>
            </div>
            <div className="flex">
              {workState === "checked" ? (
                <>
                  <div
                    className="h-10 flex-1 items-center justify-center flex gap-2 bg-blue-500 text-white"
                    onClick={() => setAction("editCheck")}
                  >
                    <IoSettingsOutline />
                    Sửa thời gian
                  </div>
                  <div
                    className="h-10 flex-1 items-center justify-center flex gap-2 bg-red-400 text-white"
                    onClick={() => handleCancelState()}
                  >
                    <FaCircleXmark />
                    Hủy chấm
                  </div>
                </>
              ) : workState === "dayOff" ? (
                <>
                  <div
                    className="h-10 flex-1 items-center justify-center flex gap-2 bg-red-400 text-white"
                    onClick={() => setAction("editOff")}
                  >
                    <BsClipboardCheckFill />
                    Sửa kiểu nghỉ
                  </div>
                  <div
                    className="h-10 flex-1 items-center justify-center flex gap-2 bg-blue-500 text-white"
                    onClick={() => handleCancelState()}
                  >
                    <PiCalendarXFill /> Thôi, chê
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="h-10 flex-1 items-center justify-center flex gap-2 bg-blue-500 text-white"
                    onClick={() => setAction("check")}
                  >
                    <BsClipboardCheckFill />
                    Cham cong
                  </div>
                  <div
                    className="h-10 flex-1 items-center justify-center flex gap-2 bg-red-400 text-white"
                    onClick={() => setAction("off")}
                  >
                    <PiCalendarXFill /> Nay nghi
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 mt-2">
          <BangCong dayInfos={monthWorkInfo.data} year={2024} month={4} />
        </div>
      </div>

      {/* Popup */}

      {createWorkPage ? (
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
      ) : null}
    </div>
  );
}

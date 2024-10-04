import { useAppStore } from "@/store/app.store";
import * as React from "react";
import { homeQuery } from "../_utils/_query";
import { getDate } from "@/lib/utils";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCircleXmark } from "react-icons/fa6";
import { BsClipboardCheckFill } from "react-icons/bs";
import { PiCalendarXFill } from "react-icons/pi";
import { WorkDateType } from "../_utils/_interface";
import { PopupWrapper } from "@/pages/taobangcong/popup/workShiftDetail";
import WorkCheck from "../popup/workCheck";
import { useHomeApi } from "../_utils/_api";
import { toast } from "react-toastify";

export interface ITodayStatusProps {}

export default function TodayStatus(props: ITodayStatusProps) {
  const { userInfo } = useAppStore();
  const { workShiftQuery, monthWorkQuery } = homeQuery();
  const { cancelState } = useHomeApi();
  const { isLoading, data: workShifts } = workShiftQuery;

  const [popup, setPopup] = React.useState(false);
  const [action, setAction] = React.useState<
    "check" | "edit" | "off" | undefined
  >(undefined);

  const todayInfo = React.useMemo(
    () => monthWorkQuery.data?.find((dayInfo) => dayInfo.ngay === getDate()),
    [monthWorkQuery]
  );

  console.log("todayInfo :>> ", todayInfo);
  const todayState = React.useMemo(() => {
    if (
      (todayInfo?.giora && todayInfo?.giovao && todayInfo.kieungay,
      todayInfo?.ca)
    )
      return "checked";
    if (todayInfo?.kieunghi) return "dayOff";

    return "";
  }, [todayInfo]);

  const handleCancelState = async () => {
    try {
      if (!todayInfo?.id) return toast.error("Ma huy khong hop le");
      await cancelState({ machamcong: todayInfo.id });
      monthWorkQuery.refetch();
    } catch (error) {}
  };

  return (
    <>
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
            {todayState === "checked" ? (
              <>
                <div
                  className="h-10 flex-1 items-center justify-center flex gap-2 bg-blue-500 text-white"
                  onClick={() => setPopup(true)}
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
            ) : todayState === "dayOff" ? (
              <>
                <div
                  className="h-10 flex-1 items-center justify-center flex gap-2 bg-red-400 text-white"
                  onClick={() => setPopup(true)}
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
                  onClick={() => setPopup(true)}
                >
                  <BsClipboardCheckFill />
                  Cham cong
                </div>
                <div
                  className="h-10 flex-1 items-center justify-center flex gap-2 bg-red-400 text-white"
                  onClick={() => setPopup(true)}
                >
                  <PiCalendarXFill /> Nay nghi
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Pop up container */}

      {popup ? (
        <PopupWrapper onClose={() => setPopup(false)}>
          <WorkCheck
            todayState={todayState}
            todayInfo={todayInfo}
            onClose={() => {
              setPopup(false);
              monthWorkQuery.refetch();
            }}
          />
        </PopupWrapper>
      ) : null}
    </>
  );
}

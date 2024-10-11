import { useAppStore } from "@/store/app.store";
import * as React from "react";
import { homeQuery } from "../_utils/_query";
import { getDate, getTimeDiff } from "@/lib/utils";
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
  const { cancelState, checkDate, offDate } = useHomeApi();
  const { isLoading, data: workShifts } = workShiftQuery;

  const [popup, setPopup] = React.useState(false);
  const [action, setAction] = React.useState<
    "check" | "edit" | "off" | undefined
  >(undefined);

  const todayInfo = React.useMemo(
    () => monthWorkQuery.data?.find((dayInfo) => dayInfo.ngay === getDate()),
    [monthWorkQuery.data]
  );

  console.log("todayInfo", todayInfo);

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

  const fastCheck = async (date?: string) => {
    try {
      console.log("workShifts", workShifts);
      if (!workShifts?.id) return toast.error("Chua chon bang cong");
      let giolam = 0;
      const lam = getTimeDiff("17:00:00", "08:00:00");
      if (lam > 0) {
        giolam = Math.floor((lam * 100) / 60) / 100;
      } else {
        giolam = 24 + Math.floor((-lam * 100) / 60) / 100;
      }

      //Co chon ca mac dinh thi lay ca mac dinh
      await checkDate({
        ca: workShifts?.kieucas?.[0].id,
        kieungay: workShifts?.kieungays?.[0].id,
        ngay: getDate(),
        giovao: getDate() + "T08:00",
        giora: getDate() + "T17:00",
        giolam,
        tuchamcong: workShifts?.id,
      });
      monthWorkQuery.refetch();
    } catch (error) {
      toast.error("Cham cong khong thanh cong");
    }
  };
  const fastOff = async () => {
    try {
      console.log("workShifts", workShifts);
      if (!workShifts?.id) return toast.error("Chua chon bang cong");
      await offDate({
        ngay: getDate(),
        tuchamcong: workShifts?.id,
      });
      monthWorkQuery.refetch();
    } catch (error) {
      toast.error("Cham cong khong thanh cong");
    }
  };

  // const handleChamCong = async() => { await checkDate({

  // }) }

  return (
    <div className="h-44 rounded-xl flex flex-col justify-between shadow-md shadow-gray-400 bg-white p-4">
      <div className="flex gap-3">
        <div
          className="calendar text-center px-1 py-0.5 rounded shadow-md shadow-gray-800"
          style={{ border: "1px solid #E5E7EB" }}
        >
          <p className=" text-gray-500">
            {new Date().getDay() ? "Thu " + new Date().getDay() : "Chu nhat"}
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
          <p className="flex-1">Nay di lam chu? Cham cong nao ban oi :V</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        {todayInfo?.dilam ? (
          <>
            <div
              className="rounded-xl flex items-center justify-center gap-2 bg-blue-400 shadow shadow-blue-400 text-white h-10 flex-1"
              onClick={() => setPopup(true)}
            >
              <IoSettingsOutline />
              Sửa thời gian
            </div>
            <div
              className="rounded-xl flex items-center justify-center gap-2 bg-red-500 text-white h-10 w-28 shadow shadow-red-400"
              onClick={() => handleCancelState()}
            >
              <FaCircleXmark />
              Hủy chấm
            </div>
          </>
        ) : todayInfo?.dilam === false ? (
          <>
            <div
              className="rounded-xl flex items-center justify-center gap-2 bg-orange-500 shadow shadow-blue-400 text-white h-10 flex-1"
              onClick={() => setPopup(true)}
            >
              <BsClipboardCheckFill />
              Sửa kiểu nghỉ
            </div>
            <div
              className="rounded-xl flex items-center justify-center gap-2 bg-red-500 text-white h-10 w-28 shadow shadow-red-400"
              onClick={() => handleCancelState()}
            >
              <PiCalendarXFill /> Thôi, chê
            </div>
          </>
        ) : (
          <>
            <div
              className="rounded-xl flex items-center justify-center gap-2 bg-blue-600 shadow shadow-blue-400 text-white h-10 flex-1"
              onClick={() => fastCheck()}
            >
              <BsClipboardCheckFill />
              Chấm công
            </div>
            <div
              className="rounded-xl flex items-center justify-center gap-2 bg-red-500 text-white h-10 w-28 shadow shadow-red-400"
              onClick={() => fastOff()}
            >
              <PiCalendarXFill /> Nay nghi
            </div>
          </>
        )}
      </div>

      {popup ? (
        <PopupWrapper onClose={() => setPopup(false)}>
          <WorkCheck
            todayInfo={todayInfo}
            onClose={() => {
              setPopup(false);
              monthWorkQuery.refetch();
            }}
          />
        </PopupWrapper>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="px-4">
        <div className="bg-white rounded-t-lg h-40 shadow shadow-gray-700  flex flex-col">
          <div
            className="info flex flex-col flex-1 py-4 items-center justify-center gap-2"
            style={{ borderBottom: "1px solid #aaa" }}
          >
            <img src={userInfo.avatar} className="h-12 w-12" />
            <div>Cau chui the cua mieng cua thanh niena nao do</div>
          </div>
          <div className="flex">
            {todayInfo?.dilam ? (
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
            ) : todayInfo?.dilam === false ? (
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
                  onClick={() => fastCheck()}
                >
                  <BsClipboardCheckFill />
                  Cham cong
                </div>
                <div
                  className="h-10 flex-1 items-center justify-center flex gap-2 bg-red-400 text-white"
                  onClick={() => fastOff()}
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

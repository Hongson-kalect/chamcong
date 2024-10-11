import * as React from "react";
import BangCong from "./bangcong";
import { Empty } from "antd";
import homeQuery from "../_utils/_query";
import { WorkDateType } from "../_utils/_interface";
import { FaAngleRight, FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { PayItem } from "@/components/wageItem";
import { getDate, getTimeDiff, scrollToElement } from "@/lib/utils";
import { PiPersonSimpleRunBold } from "react-icons/pi";
import { GiNightSleep } from "react-icons/gi";
import { DayPay } from "./todayInfo";
import { PopupWrapper } from "@/pages/taobangcong/popup/workShiftDetail";
import DayCheck from "../popup/dayCheck";
import { toast } from "react-toastify";
import { useHomeApi } from "../_utils/_api";

export interface IMonthInfoProps {}

export default function MonthInfo(props: IMonthInfoProps) {
  const { monthWorkQuery, workShiftQuery } = homeQuery();
  const [dayCheckPopup, setDayCheckPopup] = React.useState(false);
  const { cancelState, checkDate, offDate } = useHomeApi();

  const [selectedDate, setSelectedDate] = React.useState<{
    date: Date;
    value?: WorkDateType;
  } | null>(null);

  console.log("selectedDate :>> ", selectedDate);
  const [ca, kieungay]: [string | undefined, string | undefined] =
    React.useMemo(() => {
      if (!selectedDate?.value || !monthWorkQuery.data)
        return [undefined, undefined];
      const tCa = workShiftQuery.data?.kieucas.find(
        (item) => item.id === selectedDate?.value?.ca
      )?.tenca;
      const tKieungay = workShiftQuery.data?.kieungays.find(
        (item) => item.id === selectedDate.value?.kieungay
      )?.tenloaingay;
      return [tCa, tKieungay];
    }, [selectedDate?.value, workShiftQuery.data]);

  const fastCheck = async (date?: string) => {
    try {
      console.log("workShifts", workShiftQuery.data);
      if (!workShiftQuery.data?.id) return toast.error("Chua chon bang cong");
      let giolam = 0;
      const lam = getTimeDiff("17:00:00", "08:00:00");
      if (lam > 0) {
        giolam = Math.floor((lam * 100) / 60) / 100;
      } else {
        giolam = 24 + Math.floor((-lam * 100) / 60) / 100;
      }

      //Co chon ca mac dinh thi lay ca mac dinh
      await checkDate({
        ca: workShiftQuery.data?.kieucas?.[0].id,
        kieungay: workShiftQuery.data?.kieungays?.[0].id,
        ngay: date || getDate(),
        giovao: getDate() + "T08:00",
        giora: getDate() + "T17:00",
        giolam,
        tuchamcong: workShiftQuery.data?.id,
      });
      monthWorkQuery.refetch();
    } catch (error) {
      toast.error("Cham cong khong thanh cong");
    }
  };

  const cancelCheck = async () => {
    if (!selectedDate?.value) return toast.error("Chưa chọn ngày");
    try {
      await cancelState({ machamcong: selectedDate?.value?.id });
      monthWorkQuery.refetch();
      // return
    } catch (error) {
      toast.error("Hủy chấm không thành công");
    }
  };

  React.useEffect(() => {
    if (monthWorkQuery.data && selectedDate) {
      const changedDate = monthWorkQuery.data.find(
        (dayInfo) => dayInfo.ngay === getDate(selectedDate?.date)
      );
      if (changedDate)
        setSelectedDate({
          ...selectedDate,
          value: { ...changedDate },
        });
      else {
        setSelectedDate({
          ...selectedDate,
          value: undefined,
        });
      }
    }
  }, [monthWorkQuery.data]);

  return (
    <div
      className="overflow-scroll h-[100vh] px-4 pt-8 flex flex-col snap-start relative"
      id="month-info"
    >
      <BangCong
        onSelect={(date, value) => setSelectedDate({ date, value })}
        dayInfos={monthWorkQuery.data}
        year={2024}
        month={new Date().getMonth()}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex">
          {selectedDate ? (
            <div className="w-full flex-1">
              {selectedDate.value ? (
                <div className="mt-10">
                  <div className="flex items-center justify-between h-8">
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-medium">{kieungay}</p>
                      <p className="text font-light">/ {ca}</p>
                    </div>
                    <p className="font-medium text-green-600">+ 234.567 đ</p>
                  </div>
                  <div className="flex mt-4 items-center gap-1 justify-between">
                    <p className=" text-blue-600 font-medium text-xl">
                      {selectedDate.value.giovao.slice(11, 16)}
                    </p>
                    <div className="flex-1 flex items-center">
                      <div className="flex-1 h-[1px] bg-gray-300" />

                      <FaAngleRight
                        size={20}
                        className="-ml-1.5  text-gray-300"
                      />
                    </div>
                    <p className="text-2xl text-blue-800 font-medium">
                      {selectedDate.value.giora.slice(11, 16)}
                    </p>
                    <div className="options flex items-center gap-2 px-2 ml-2">
                      <IoSettings
                        onClick={() => setDayCheckPopup(true)}
                        size={40}
                        className="text-orange-400"
                      />
                      <MdDelete
                        onClick={cancelCheck}
                        size={24}
                        className="text-red-600"
                      />
                    </div>
                  </div>
                  <DayPay todayInfo={selectedDate.value} />
                  {/* <DayPay todayInfo={selectedDate.value} />
                  <DayPay todayInfo={selectedDate.value} />
                  <DayPay todayInfo={selectedDate.value} />
                  <DayPay todayInfo={selectedDate.value} />
                  <DayPay todayInfo={selectedDate.value} /> */}
                  <div className="h-8"></div>
                </div>
              ) : (
                // <div className="h-44 rounded-xl flex flex-col justify-between shadow-md shadow-gray-400 bg-white p-4">
                //   <div className="flex gap-3">
                //     <div
                //       className="calendar text-center px-1 py-0.5 rounded shadow-md shadow-gray-800"
                //       style={{ border: "1px solid #E5E7EB" }}
                //     >
                //       <p className=" text-gray-500">
                //         {new Date().getDay()
                //           ? "Thu " + new Date().getDay()
                //           : "Chu nhat"}
                //       </p>
                //       <p className="text-2xl font-medium text-blue-900">
                //         {new Date().getDate()}
                //       </p>
                //       <p className="text-blue-200 text-xs">
                //         Thang {new Date().getMonth() + 1}
                //       </p>
                //     </div>
                //     <div
                //       className="flex-1 flex items-center p-2 gap-4 shadow-md shadow-gray-800 rounded"
                //       style={{ border: "1px solid #E5E7EB" }}
                //     >
                //       <div className="h-10 w-10 bg-red-200 rounded"></div>
                //       <p className="flex-1">
                //         Nay di lam chu? Cham cong nao ban oi :V
                //       </p>
                //     </div>
                //   </div>
                //   <div className="flex items-center gap-8">
                //     <button className="rounded-xl bg-blue-600 shadow shadow-blue-400 text-white h-10 flex-1">
                //       Chấm công
                //     </button>
                //     <button className="rounded-xl bg-red-500 text-white h-10 w-28 shadow shadow-red-400">
                //       Nghỉ
                //     </button>
                //   </div>
                // </div>
                <div className=" pt-8 pb-6 flex flex-col items-center gap-4 h-full">
                  {/* Ảnh dấu hỏi chấm */}
                  <div className="w-full px-4 rounded-xl py-2">
                    <Empty
                      description={
                        "Chưa có thông tin của này bạn đã chọn, chọn ngày khác hoặc đánh dấu hôm nay là:"
                      }
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4 flex-col">
                    <button
                      onClick={() => fastCheck(getDate(selectedDate.date))}
                      className="flex gap-2 items-center justify-center rounded-xl bg-blue-600 w-52 shadow shadow-blue-300 text-white h-10"
                    >
                      <PiPersonSimpleRunBold />
                      <p>Đi làm</p>
                    </button>
                    <button className="flex gap-2 items-center justify-center rounded-xl bg-red-400 text-white h-8 opacity-70 w-32 shadow shadow-red-300">
                      <GiNightSleep
                        onClick={() => alert("Chưa có API cho ngày nghỉ")}
                      />
                      <p>Nghỉ</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Để ảnh 1 thằng cầm kính lúp tìm tìm
            <Empty
              className="mt-10 px-8"
              description={
                "Đây là chi tiết lương của bạn, hãy chọn một ngày nào!! "
              }
            ></Empty>
          )}
        </div>
      </div>

      {dayCheckPopup ? (
        <PopupWrapper onClose={() => setDayCheckPopup(false)}>
          {selectedDate?.value?.ngay ? (
            <DayCheck
              day={selectedDate?.value.ngay}
              onClose={() => setDayCheckPopup(false)}
            />
          ) : null}
        </PopupWrapper>
      ) : null}

      {/* <div className="absolute bottom-10 right-4 flex flex-col items-center justify-end">
        <button
          onClick={() => scrollToElement("month-info")}
          className="right-4 h-10 w-10 bg-blue-500 opacity-50 text-white rounded-full flex items-center justify-center"
        >
          <FaArrowDown />
        </button>
        <button
          onClick={() => scrollToElement("month-info")}
          className="right-4 h-10 w-10 bg-blue-500 opacity-50 text-white rounded-full flex items-center justify-center"
        >
          <FaArrowUp />
        </button>
      </div> */}
    </div>
  );
}

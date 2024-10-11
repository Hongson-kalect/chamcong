import UserHeader from "@/components/userheader";
import { PayItem } from "@/components/wageItem";
import { scrollToElement } from "@/lib/utils";
import * as React from "react";
import { FaArrowDown } from "react-icons/fa6";
import ChangeDate from "../components/changeDate";
import Overview from "../components/overview";
import DeDuctDetail from "../components/deductDetail";
import PayDetail from "../components/payDetail";

export interface ITinhLuongProps {}

export default function TinhLuong(props: ITinhLuongProps) {
  const [isYear, setIsYear] = React.useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-auto snap-start pt-8">
      {/* <Header /> */}
      <div
        className="flex-1 overflow-scroll px-2"
        // style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <p className="px-2 uppercase font-medium text-gray-500">
          Lương ước tính
        </p>
        <div className="flex items-end justify-between pt-2">
          <div className="">
            <p className="font-medium text-gray-700">Thực lĩnh</p>
            <div className="relative mt-2 text-blue-900">
              <p className="pr-3 text-3xl font-medium">12.765.987</p>
              <p className="absolute right-0 top-0 font-medium">đ</p>
            </div>
            <p className="font-light text-gray-300">Chi trả: 10-06-2024</p>
          </div>

          <ChangeDate isYear={isYear} setIsYear={setIsYear} />
        </div>
        <Overview />
        {/* <Payment /> */}
        <PayDetail />

        <DeDuctDetail />
        <div className="h-4"></div>
      </div>
    </div>
  );
  return (
    <div className="h-screen snap-start relative">
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
              <p className="flex-1">Nay di lam chu? Cham cong nao ban oi :V</p>
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
          <p className="font-medium text-sm text-gray-500">Công việc hôm nay</p>
          <p className="font-medium text-green-600 text-xl">+ 234.567 đ</p>
        </div>
        <div className="wage-list py-4 flex flex-col gap-5 px-1">
          <PayItem name="Lương cơ bản" amount={234567} time={8} />
          <PayItem name="Lương cơ bản" amount={234567} time={8} />
          <PayItem name="Lương cơ bản" amount={234567} time={8} />
          <PayItem name="Lương cơ bản" amount={-234567} time={8} />
        </div>
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

import { numberToCurrency2 } from "@/lib/utils";
import * as React from "react";
import { FaPersonDigging } from "react-icons/fa6";

export interface IOverviewProps {}

export default function Overview(props: IOverviewProps) {
  return (
    <div
      className="mt-8 rounded-lg shadow-inner shadow-gray-300"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      <div className="flex justify-around py-4">
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-medium text-white shadow shadow-blue-400">
            28
          </p>
          <p className="mt-1 text-base text-slate-400">Tổng ngày</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-medium text-white shadow shadow-blue-400">
            2400
          </p>
          <p className="mt-1 text-base text-slate-400">Giờ làm</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-medium text-white shadow shadow-blue-400">
            1200
          </p>
          <p className="mt-1 text-base text-slate-400">Tăng ca</p>
        </div>
      </div>

      <div className="flex" style={{ borderTop: "1px solid #ddd" }}>
        <div
          className="flex flex-1 flex-col items-center pb-2"
          style={{ borderRight: "1px solid #ddd" }}
        >
          <p className="mt-2 w-full pl-3 text-sm text-slate-400">
            Lương thưởng
          </p>
          <div className="relative mt-3 pr-3 text-2xl font-medium text-green-700 opacity-80">
            <p>{numberToCurrency2(12345678)}</p>
            <p className="absolute right-0 top-0 text-sm">đ</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center">
          <p className="mt-2 w-full pl-3 text-sm text-slate-400">Khấu trừ</p>
          <div className="relative mt-3 pr-3 text-2xl font-medium text-red-700 opacity-80">
            <p>{numberToCurrency2(1234567)}</p>
            <p className="absolute right-0 top-0 text-sm">đ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

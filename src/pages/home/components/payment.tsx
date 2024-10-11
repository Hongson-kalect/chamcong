import VNDONG from "@/components/vnd";
import { numberToCurrency2 } from "@/lib/utils";
import * as React from "react";
import { PiMoneyWavyFill } from "react-icons/pi";

export interface IPaymentProps {}

export default function Payment(props: IPaymentProps) {
  return (
    <div
      className="mx-4 mt-2 border-gray-400 py-2"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      <div className="py-2">
        <div className="flex items-center gap-4 text-xl text-white">
          <div className="flex gap-2">
            <PiMoneyWavyFill size={24} />
            Thực lĩnh
          </div>
          <span className="text-2xl font-bold text-black">
            {numberToCurrency2(12345678)}
          </span>
        </div>

        <div className="mt-4 flex justify-between px-2 text-gray-300 [&>div]:flex-1">
          <div className="flex flex-col gap-2">
            <p className="w-20 text-xl">Chi trả</p>
            <span className="flex justify-center text-xl font-medium text-gray-950">
              <VNDONG value={12345678} />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="w-20 text-xl">Khấu trừ</p>
            <span className="flex justify-center text-xl font-medium text-gray-950">
              <VNDONG value={12345678} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

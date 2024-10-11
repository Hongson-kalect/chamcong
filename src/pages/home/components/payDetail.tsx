import * as React from "react";
import PayItem from "./payItem";

export interface IPayDetailProps {}

export default function PayDetail(props: IPayDetailProps) {
  return (
    <div className="mt-8">
      <p className="font-medium text-gray-700">Chi tiết phiếu lương</p>
      <div className="mt-4 flex flex-col gap-3">
        <PayItem name="Lương cơ bản" time="8H" value={6300000} />
        <PayItem name="P/C sinh hoạt" time="12H30" value={123124} />
        <PayItem name="P/C làm đêm" time="12H30" value={124312354} />
        <PayItem name="P/C làm CN" time="12H30" value={345345} />
        <PayItem name="P/C tăng ca" time="12H30" value={45645} />
        <PayItem name="P/C tăng ca đêm" time="12H30" value={23423} />
        <PayItem name="P/C tăng ca CN" time="12H30" value={43634524} />
        <PayItem name="Hỗ trợ ăn" time="12H30" value={234234} />
        <PayItem name="Hỗ trợ ăn đêm" time="12H30" value={6767} />
        <PayItem name="Thưởng chuyên cần" time="12H30" value={78678} />
        <PayItem name="P/C di chuyển" time="12H30" value={90678} />
        <PayItem name="P/C con nhỏ" time="12H30" value={456456} />
        <PayItem name="P/C làm ngày lễ" time="12H30" value={234245324} />
        <PayItem name="P/C tăng ca ngày lễ" time="12H30" value={4534634} />
      </div>
      {/* <PayItem name="" time="12H30" value={12345678} /> */}
      {/* <PayItem name="P/C tăng ca CN" time="12H30" value={12345678} /> */}
    </div>
  );
}

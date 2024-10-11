import * as React from "react";
import PayItem from "./payItem";

export interface IDeDuctDetailProps {}

export default function DeDuctDetail(props: IDeDuctDetailProps) {
  return (
    <div className="mt-8">
      <p className="font-medium text-red-700">Chi tiết khấu trừ</p>
      <div className="mt-4 flex flex-col gap-3">
        <PayItem isDeDuct name="Hỗ trợ ăn đêm" value={6767} />
        <PayItem isDeDuct name="Thưởng chuyên cần" value={78678} />
        <PayItem isDeDuct name="P/C di chuyển" value={90678} />
        <PayItem isDeDuct name="P/C con nhỏ" value={456456} />
        <PayItem
          isDeDuct
          name="P/C làm ngày lễ"
          time="12H30"
          value={234245324}
        />
        <PayItem
          isDeDuct
          name="P/C tăng ca ngày lễ"
          time="12H30"
          value={4534634}
        />
      </div>
      {/* <PayItem name="" time="12H30" value={12345678} /> */}
      {/* <PayItem name="P/C tăng ca CN" time="12H30" value={12345678} /> */}
    </div>
  );
}

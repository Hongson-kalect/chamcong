import { numberToCurrency2 } from "@/lib/utils";
import * as React from "react";

export interface IVNDONGProps {
  value: string | number;
}

export default function VNDONG(props: IVNDONGProps) {
  const value = React.useMemo(
    () => numberToCurrency2(props.value, 3, ","),
    [props.value]
  );
  return (
    <div className="relative pr-2.5">
      <div className="text-right">{value}</div>
      <div className="absolute -top-1 right-0 text-xs">đ</div>
    </div>
  );
}

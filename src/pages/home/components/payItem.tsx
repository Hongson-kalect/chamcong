import VNDONG from "@/components/vnd";
import * as React from "react";

export interface IPayItemProps {
  isDeDuct?: boolean;
  name: string;
  time?: string;
  value: string | number;
}

export default function PayItem(props: IPayItemProps) {
  //   const [value] = React.useState(() => {
  //     const text = numberToCurrency(Number(props.value)).toString();
  //     return text.slice(0, text.length - 1);
  //   });
  return (
    <div className="flex h-14 w-full items-center justify-between rounded-lg px-4 shadow-md shadow-gray-300">
      <div
        className={`type h-10 w-10 rounded-full ${
          props.isDeDuct ? "bg-red-700" : "bg-green-700"
        }`}
      />
      <div className="ml-4 flex flex-1 items-center justify-between">
        <div className="title flex flex-1 flex-col justify-between">
          <div className="flex-1 text-sm font-medium uppercase text-gray-700">
            {props.name}
          </div>
          {props.time ? (
            <div className={`text-sm font-medium text-gray-400`}>
              {props.time}
            </div>
          ) : null}
        </div>

        <div
          className={`font-medium ${
            !props.isDeDuct ? "text-gray-700" : "text-red-700"
          } flex items-center`}
        >
          <VNDONG value={props.value} />
        </div>
      </div>
    </div>
  );
}

import React from "react";

type PayItem = {
  name: string;
  time?: number;
  amount: number;
};
export const PayItem = (props: PayItem) => {
  const sub = React.useMemo(() => {
    return props.amount < 0;
  }, [props]);
  return (
    <div
      className={`h-14 flex items-center justify-between gap-2 px-4 py-2 rounded-xl shadow-md ${
        sub ? "bg-pink-50 shadow-red-200" : " shadow-gray-500"
      }`}
    >
      <div className="flex gap-2">
        <div
          className={`h-10 w-10 rounded-full ${
            sub ? "bg-red-400" : "bg-green-600"
          }`}
        ></div>
        <div className="flex flex-col">
          <p className="uppercase text-sm">{props.name}</p>
          <p className="text-gray-400 text-sm -mt-0.5">
            {props.time && props.time + "H"}
          </p>
        </div>
      </div>
      <div className={`${sub ? "text-red-600" : "text-green-600"} font-medium`}>
        {props.amount && props.amount + " đ"}
      </div>
    </div>
  );
};

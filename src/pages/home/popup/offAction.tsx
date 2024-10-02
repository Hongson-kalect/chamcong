import { Select, TimePicker } from "antd";
import * as React from "react";
import { useHomeStore } from "../_utils/_store";
import { useHomeApi } from "../_utils/_api";

export interface IOffActionProps {
  onClose: () => void;
}

export default function OffAction(props: IOffActionProps) {
  //Lay duoc du lieu bang cong hien tai cua nguoi dung
  const { setWorkState } = useHomeStore();
  const { checkDate, offDate } = useHomeApi();

  const handleOffAction = async () => {
    await offDate({
      kieunghi: "1",
      tuchamcong: 3,
    });
    setWorkState("dayOff");

    props.onClose();
  };

  return (
    <div className="px-4">
      <div className="bg-white rounded-lg p-2">
        <div className="text-center text-xl font-medium">Nay nghi</div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Kieu nghi</p>
          <Select
            className="w-fit w-1/2"
            options={[
              { label: "Nghi ko phep", value: "1" },
              { label: "Phep nam", value: "2" },
              { label: "Nghi om", value: "3" },
              { label: "Nghi khac", value: "4" },
            ]}
          />
        </div>
        <button
          className="w-full h-10 bg-red-400 text-lg text-white mt-4 rounded-lg"
          onClick={handleOffAction}
        >
          Xac nhan
        </button>
      </div>
    </div>
  );
}

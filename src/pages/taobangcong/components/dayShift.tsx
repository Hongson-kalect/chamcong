import { TimePicker } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { WorkShiftType } from "../_utils/_interface";
import { IoSettingsOutline } from "react-icons/io5";
import WorkShiftDetailSetting, { PopupWrapper } from "../popup/workShiftDetail";

export interface IWorkShiftProps {
  shift: WorkShiftType;
  onChange: () => void;
}

export default function WorkShift(props: IWorkShiftProps) {
  const [shift, setShift] = React.useState<WorkShiftType>(props.shift);
  const [showDetailSetting, setShowDetailSetting] = React.useState(false);

  React.useEffect(props.onChange, [shift]);

  return (
    <>
      <div className="work-shift flex py-2 px-4 bg-blue-600 rounded-lg justify-between items-center">
        <div>
          <div className="flex gap-2 items-center text-white">
            <RiEdit2Fill className="-scale-x-100" />
            <input
              className="bg-transparent border-none"
              value={shift.name}
              onChange={(e) => setShift({ ...shift, name: e.target.value })}
            />
            {/* <p>{shift.name}</p> */}
          </div>
          <div className="flex mt-1 items-center gap-2">
            <div className="w-16 h-8 bg-white rounded shadow-inner shadow-black flex items-center justify-center">
              <TimePicker
                size="large"
                className="h-full w-full"
                allowClear={false}
                defaultValue={dayjs(
                  `${Math.floor(shift.start / 60)}:${shift.start % 60}`,
                  "HH:mm"
                )}
                onChange={(val) => {
                  setShift({ ...shift, start: val.hour() * 60 + val.minute() });
                }}
                format={"HH:mm"}
                suffixIcon={null}
              />
            </div>
            <p className="text-gray-200">den</p>
            <div className="w-16 h-8 bg-white rounded shadow-inner shadow-black flex items-center justify-center">
              <TimePicker
                size="large"
                className="h-full w-full [&_*]:text-lg"
                allowClear={false}
                defaultValue={dayjs(
                  `${Math.floor(shift.end / 60)}:${shift.end % 60}`,
                  "HH:mm"
                )}
                onChange={(val) => {
                  setShift({ ...shift, end: val.hour() * 60 + val.minute() });
                }}
                format={"HH:mm"}
                suffixIcon={null}
              />
            </div>
          </div>
        </div>
        <div className="p-2 pl-4" style={{ borderLeft: "1px solid white" }}>
          <IoSettingsOutline
            className="h-8 w-8 text-white"
            onClick={() => setShowDetailSetting(true)}
          />
        </div>
      </div>
      {/* Pop up */}

      {showDetailSetting && (
        <PopupWrapper onClose={() => setShowDetailSetting(false)}>
          <WorkShiftDetailSetting
            onClose={() => setShowDetailSetting(false)}
            shift={shift}
          />
        </PopupWrapper>
      )}
    </>
  );
}

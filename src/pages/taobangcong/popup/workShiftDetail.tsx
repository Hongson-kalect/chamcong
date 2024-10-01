import * as React from "react";
import { WorkShiftType } from "../_utils/_interface";

export interface IWorkShiftDetailSettingProps {
  onClose: () => void;
  shift: WorkShiftType;
}

export default function WorkShiftDetailSetting(
  props: IWorkShiftDetailSettingProps
) {
  console.log("props", props.shift);
  const [selectedPhase, setSelectedPhase] = React.useState(0);

  return (
    <div className=" p-2">
      <div className="bg-white pop-up rounded-lg py-2">
        <div
          className="text-xl text-indigo-800 font-semibold pb-1 px-2"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          Ca ngay
        </div>
        <div className="px-3">
          <div className="flex items-center justify-between">
            Gio hanh chinh
            <p>8:00</p>
            <p>den</p>
            <p>17:00</p>
          </div>

          <p>He so luong</p>

          <div className="time-line flex items-center w-full flex-1 pb-6 pt-2">
            {props.shift.phase.map((phase, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedPhase(index)}
                  className={`relative mt-3 flex items-center w-full`}
                >
                  <div className="h-4 w-4 rounded-full bg-blue-800"></div>
                  <div
                    className={`flex-1 h-0.5 bg-blue-200  ${
                      selectedPhase === index ? "bg-blue-400 h-1" : ""
                    }`}
                  ></div>

                  <div className="absolute -bottom-5 -left-1">
                    <p
                      className={`${
                        [selectedPhase, selectedPhase + 1].includes(index)
                          ? "font-medium text-blue-800  -top-4"
                          : ""
                      }`}
                    >
                      {Math.floor(phase / 60)}:
                      {phase % 60 > 10 ? phase % 60 > 10 : "0" + (phase % 60)}
                    </p>
                  </div>

                  <div
                    className={`absolute -top-3 left-0 right-0 w-fit text-sm font-medium text-gray-700  ${
                      selectedPhase === index
                        ? "text-base text-blue-800  -top-4"
                        : ""
                    }`}
                    style={{ marginInline: "auto" }}
                  >
                    {props.shift.detail?.[index]?.scale || 100}%
                  </div>
                </div>
              );
            })}
          </div>

          <p>Chi tiet 8:00 den 17:00</p>
          <div>
            <div className="flex gap-2">
              <p>Giai lao:</p>
              <p>60</p>
              <p>Phut</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PopupWrapper = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-10 px-2 flex items-center justify-center">
      <div
        onClick={onClose}
        className="w-screen h-full bg-black opacity-60 absolute top-0 left-0"
      ></div>
      <div className="w-full relative z-[11]">{children}</div>
    </div>
  );
};

import * as React from "react";
import { WorkShiftType } from "../_utils/_interface";
import { defaultShift } from "../_utils/_utils";
import { Select, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";

export interface IWorkShiftDetailSettingProps {
  sendData: () => void;
  saveInfo?: () => void;
  shift: WorkShiftType;
}

export default function WorkShiftDetailSetting(
  props: IWorkShiftDetailSettingProps
) {
  const [shift, setShift] = React.useState<WorkShiftType>(props.shift);
  const [selectedPhase, setSelectedPhase] = React.useState(0);

  const handleCreateNote = (index: number) => {
    const tempShift = shift;
    // alert("thêm node" + index);

    tempShift.phase.splice(index + 1, 0, tempShift.phase[index]);
    tempShift.detail.splice(
      index + 1,
      0,
      JSON.parse(JSON.stringify(defaultShift.detail[0]))
    );
    props.sendData();
  };

  const addBonus = () => {
    shift.detail[selectedPhase].bonus?.push({
      name: "Thưởng",
      value: 100,
      unit: "k",
      condition: 100,
    });

    props.sendData();
  };

  const changeBonus = (
    type: "name" | "value" | "unit" | "condition",
    value: string | number,
    index: number
  ) => {
    const bonus = shift.detail[selectedPhase].bonus?.[index];
    console.log("name :>> ", value);
    if (bonus) {
      bonus[type] = value;
      props.sendData();
    }
  };

  const removePhase = () => {
    if (shift.phase.length < 2) return alert("Cần để lại ít nhất 1 phiên làm");
    shift.phase.splice(selectedPhase, 1);
    shift.detail.splice(selectedPhase, 1);
    props.sendData();
  };

  const changeStartTime = (val: Dayjs) => {
    const time = val.hour() * 60 + val.minute();
    console.log("object :>> ", shift.phase, time);
    if (time < shift.phase?.[selectedPhase - 1])
      return alert("Giờ không hợp lệ");
    if (
      shift.phase?.[selectedPhase + 1] &&
      time > shift.phase?.[selectedPhase + 1]
    )
      return alert("Giờ không hợp lệ");
    shift.phase[selectedPhase] = val.hour() * 60 + val.minute();
    if (shift.phase[selectedPhase]) props.sendData();
  };

  const changeRest = (val: number) => {
    shift.detail[selectedPhase].rest = val;
    props.sendData();
  };

  const changeScale = (val: number) => {
    console.log("selectedPhase :>> ", selectedPhase);
    console.log("val :>> ", val);
    shift.detail[selectedPhase].scale = val;
    props.sendData();
  };
  const changeName = (val: string) => {
    shift.name = val;
    props.sendData();
  };

  console.log(
    "props.shift",
    `${Math.floor(shift.phase[selectedPhase] / 60)}:${
      shift.phase[selectedPhase] % 60
    }`
  );

  React.useEffect(() => {
    return console.log("Tắt :>> ");
  }, []);

  return (
    <div className=" p-2">
      <div className="bg-white pop-up rounded-lg py-2">
        <div
          className="text-xl text-indigo-800 font-semibold pb-1 px-2"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          <input
            onChange={(e) => changeName(e.target.value)}
            value={shift.name}
            // type="number"
            spellCheck={false}
            className="h-full outline-none focus:shadow-md shadow-blue-600"
          />
        </div>
        <div className="px-3">
          <div className="flex items-center gap-2 my-2">
            <p className="font-medium text-blue-800">Giờ bắt đầu</p>
            <p className="font-semibold text-lg text-blue-900">
              {`${
                (shift.phase[0] / 60 < 10 ? "0" : "") +
                Math.floor(shift.phase[0] / 60)
              } : ${
                (shift.phase[0] % 60 < 10 ? "0" : "") + (shift.phase[0] % 60)
              }`}
            </p>
          </div>

          <p className="font-medium text-sm text-gray-500">Hệ số lương</p>

          <div className="time-line flex items-center w-full flex-1 pb-6 pt-2">
            {shift.phase.map((phase, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedPhase(index)}
                  className={`relative mt-3 flex items-center w-full`}
                >
                  <div className="h-4 w-4 rounded-full bg-blue-800"></div>
                  <div
                    onClick={
                      selectedPhase === index
                        ? () => handleCreateNote(index)
                        : undefined
                    }
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
                      {(phase / 60 < 10 ? "0" : "") + Math.floor(phase / 60)}:
                      {(phase % 60 < 10 ? "0" : "") + (phase % 60)}
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
                    {shift.detail?.[index]?.scale || 100}%
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center  text-gray-700 mb-2 justify-between">
            <p className="text-xs text-gray-600 font-medium">
              Cài đặt khoảng thời gian
            </p>
            <button
              onClick={removePhase}
              className="px-1 text-sm py-0.5 font-light rounded text-red-600"
              style={{ border: "1px solid red" }}
            >
              Xóa khoảng
            </button>
          </div>
          <div className="px-2 py-1">
            <div className="flex gap-2 items-end">
              <p className="font-medium pr-2 w-28 text-gray-500">Bắt đầu ca:</p>
              <div className="w-16 h-6 flex items-center justify-center">
                <TimePicker
                  size="large"
                  className="h-full w-full shadow-inner shadow-black "
                  allowClear={false}
                  value={dayjs(
                    `${Math.floor(shift.phase[selectedPhase] / 60)}:${
                      shift.phase[selectedPhase] % 60
                    }`,
                    "HH:mm"
                  )}
                  onChange={(val) => changeStartTime(val)}
                  format={"HH:mm"}
                  suffixIcon={null}
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium pr-2 text-gray-500">Hệ số</p>
                <div>
                  <input
                    onChange={(e) => changeScale(Number(e.target.value))}
                    value={shift.detail[selectedPhase].scale || 0}
                    type="number"
                    className="w-12 h-full shadow-inner shadow-black text-center"
                  />
                  <span className="pl-1">%</span>
                </div>
              </div>

              {/* <p>Phut</p> */}
            </div>
            <div className="flex gap-2 items-center mt-2">
              <p className="font-medium pr-2 w-28 text-gray-500">Phút nghỉ:</p>
              <div className="w-16 h-6 rounded flex items-center justify-center">
                <input
                  onChange={(e) => changeRest(Number(e.target.value))}
                  value={shift.detail[selectedPhase].rest || 0}
                  type="number"
                  className="w-full h-full shadow-inner shadow-black text-center"
                />
              </div>

              <Select
                className="h-6 w-24"
                value={"minute"}
                suffixIcon={null}
                options={[
                  { label: "Phút", value: "minute" },
                  { label: "Nghìn", value: "k" },
                ]}
              ></Select>
            </div>
            <p className="mt-2 font-medium text-sm">Khác</p>
            <div className="flex gap-4 flex-col mt-2">
              {shift.detail[selectedPhase].bonus?.map((bonus, index) => {
                return (
                  <div
                    className="py-2 px-2 rounded-lg shadow-inner shadow-black"
                    // style={{ border: "1px solid gray" }}
                  >
                    <div className="flex items-center " key={index}>
                      <input
                        className="font-medium w-2/5 pr-2 shadow shadow-black pl-1"
                        value={bonus.name}
                        onChange={(even) =>
                          changeBonus("name", even.target.value, index)
                        }
                      />
                      <p className="font-medium px-2">:</p>
                      <div className="flex items-center gap-2">
                        <input
                          className="w-10 font-medium text-blue-600 text-center px-1 shadow shadow-black outline-none"
                          type="number"
                          value={bonus.value}
                          onChange={(even) =>
                            changeBonus("value", even.target.value, index)
                          }
                        />
                        <Select
                          className="h-5 w-20 [&_*]:!border-none [&_*]:!shadow-none shadow shadow-black "
                          style={{ borderBottom: "1px solid gray" }}
                          suffixIcon={null}
                          value={bonus.unit || "minute"}
                          onChange={(val) => changeBonus("unit", val, index)}
                          options={[
                            { label: "Phút", value: "minute" },
                            { label: "Nghìn", value: "k" },
                          ]}
                        ></Select>
                      </div>
                    </div>
                    <div className="flex items-end mt-2">
                      <div className="font-medium text-sm text-gray-400 w-2/5 pr-2 pl-1">
                        Điều kiện
                      </div>
                      <p className="font-medium px-2">:</p>
                      <Select
                        className="h-6 w-32 [&_*]:!border-none [&_*]:!shadow-none shadow shadow-black "
                        suffixIcon={null}
                        value={bonus.condition || 0}
                        onChange={(val) => changeBonus("condition", val, index)}
                        options={[
                          { label: "Không", value: 0 },
                          { label: "Làm đủ ca", value: 100 },
                        ]}
                      ></Select>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center flex items-center justify-center mt-2">
              <AiOutlinePlus
                onClick={addBonus}
                size={48}
                className="text-gray-400 p-2 rounded-md"
                style={{ border: "1px solid #dadada" }}
              />
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

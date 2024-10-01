import * as React from "react";
import StartTabImage from "./ui/image";
import StartTabInfo from "./ui/info";
import { Button } from "@/components/ui/button";
import { useNavigate } from "zmp-ui";
import { setCookie } from "@/lib/utils";
import { setCache } from "@/store/native.store";
import DaySelect from "./components/daySelect";
import WorkShift from "./components/dayShift";
import { AiOutlinePlus } from "react-icons/ai";
import { defaultShift } from "./_utils/_utils";
import { IoSettingsOutline } from "react-icons/io5";
import { PopupWrapper } from "./popup/workShiftDetail";
import AutoCheckPopup from "./popup/autoCheckPopup";
import WageInfo from "./ui/wageInfo";
import { useAppStore } from "@/store/app.store";

export interface ICreateWorkPageProps {}

export default function CreateWorkPage(props: ICreateWorkPageProps) {
  const [tab, setTab] = React.useState(0);
  const navigate = useNavigate();
  const { userInfo } = useAppStore();

  const handleGetPermisson = async () => {
    // setCookie("used", true, 99999);
    await setCache([{ key: "used", value: true }]);
    await setCache([{ key: "used2", value: true }]);
    navigate("/get-permisson");
  };

  React.useEffect(() => {
    console.log("in tao bang cong", userInfo);
  }, []);

  const [dayMap, setDayMap] = React.useState([
    {
      day: 1,
      selected: true,
    },
    {
      day: 2,
      selected: true,
    },
    {
      day: 3,
      selected: true,
    },
    {
      day: 4,
      selected: true,
    },
    {
      day: 5,
      selected: true,
    },
    {
      day: 6,
      selected: true,
    },
    {
      day: 0,
      selected: false,
    },
  ]);
  const [wageScale, setWageScale] = React.useState<
    { name: string; scale: number }[]
  >([
    {
      name: "Thuong",
      scale: 100,
    },
    {
      name: "Chu nhat",
      scale: 200,
    },
    {
      name: "Ngay le",
      scale: 300,
    },
  ]);

  const [workShifts, setWorkShifts] = React.useState([
    JSON.parse(JSON.stringify(defaultShift)),
  ]);

  const [fixedTimeIn, setFixedTimeIn] = React.useState(true);
  const [wageInfo, setWageInfo] = React.useState(false);
  const [autoCheck, setAutoCheck] = React.useState(false);
  const [autoCheckPopup, setAutoCheckPopup] = React.useState(false);

  const toggleDate = (day: number) => {
    const tempList = [...dayMap];

    const tempDay = tempList.find((item) => item.day == day);
    if (tempDay) {
      tempDay.selected = !tempDay.selected;
      setDayMap([...tempList]);
    }
  };

  const addNewShift = () => {
    setWorkShifts([...workShifts, JSON.parse(JSON.stringify(defaultShift))]);
  };

  const addNewScale = () => {
    wageScale.push({ name: "Ten he so", scale: 100 });
    setWageScale([...wageScale]);
  };

  const removeWageScale = (index) => {
    wageScale.splice(index, 1);
    setWageScale([...wageScale]);
  };

  const changeWageScaleName = (val: string, index: number) => {
    wageScale[index].name = val;
    setWageScale([...wageScale]);
  };
  const changeWageScaleValue = (val: number, index: number) => {
    wageScale[index].scale = val;
    setWageScale([...wageScale]);
  };

  const saveWorkInfo = () => {
    //Day du lieu cai dat len server
  };

  const handleSettingWage = () => {
    saveWorkInfo();
    // navigate("/setting-wage");
    setWageInfo(true);
  };

  React.useEffect(() => {
    console.log("workShifts", workShifts);
  }, [workShifts]);

  return (
    <>
      <div className="h-full w-full bg-white">
        <div
          className="w-full header relative h-12 text-center text-gray-600 text-xl font-medium flex items-center justify-center"
          style={{ borderBottom: "1px solid #E3E3E3" }}
        >
          <p>Thong tin cong viec</p>
          <div className="absolute top-2.5 left-4 font-medium">{"<"}</div>
        </div>

        <div className="px-6 py-8">
          <div className="list pl-4" style={{ borderLeft: "1px solid #999" }}>
            <div className="work-time">
              <div className="flex items-center gap-2 -ml-9">
                <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center text-white">
                  1
                </div>
                <div className="title text-indigo-800 text-xl font-medium">
                  Ngay di lam
                </div>
              </div>
              <div className="day-lists mt-4">
                <div className="title mb-2">Ngay lam viec</div>
                <div className="flex justify-between items-center px-2 gap-1">
                  {dayMap.map((day) => {
                    return (
                      <DaySelect
                        key={day.day}
                        day={day.day}
                        selected={day.selected}
                        onClick={() => toggleDate(day.day)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="options pl-3 mt-4">
                <div className="flex gap-4 items-center">
                  <div>
                    <input
                      id="fixed-time-in"
                      checked={fixedTimeIn}
                      onChange={() => setFixedTimeIn(!fixedTimeIn)}
                      type="checkbox"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fixed-time-in"
                      className="text-lg font-medium text-blue-700"
                    >
                      Gio den co dinh
                    </label>
                    <p className="text-sm text-blue-400">
                      Bo qua cham cong den
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="h-10">
                    <input
                      checked={autoCheck}
                      onChange={() => setAutoCheck(!autoCheck)}
                      id="auto-check"
                      type="checkbox"
                      className="h-full"
                    />
                  </div>
                  <label
                    htmlFor="auto-check"
                    className="text-lg font-medium text-blue-700"
                  >
                    Tu dong cham cong
                  </label>
                  <div onClick={() => setAutoCheckPopup(true)}>
                    <IoSettingsOutline
                      className="h-6 w-6 text-gray-700"
                      onClick={() => setAutoCheckPopup(true)}
                    />
                    {/* <div className="w-7 h-7 bg-blue-600 rounded-full"></div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="work-shift">
              <div className="flex items-center gap-2 -ml-9">
                <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center text-white">
                  2
                </div>
                <div className="title text-indigo-800 text-xl font-medium">
                  Ca lam viec
                </div>
              </div>
              <div className="shift-lists mt-4 flex flex-col gap-3">
                {workShifts.map((shift, index) => {
                  return (
                    <WorkShift
                      shift={shift}
                      key={index}
                      onChange={() => setWorkShifts((prev) => [...prev])}
                    />
                  );
                })}
                <div className="text-center flex items-center justify-center mt-2">
                  <AiOutlinePlus
                    onClick={addNewShift}
                    size={48}
                    className="text-gray-400 p-2 rounded-md"
                    style={{ border: "1px solid #dadada" }}
                  />
                </div>
              </div>
            </div>

            <div className="work-shift">
              <div className="flex items-center gap-2 -ml-9">
                <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center text-white">
                  3
                </div>
                <div className="title text-indigo-800 text-xl font-medium">
                  He so luong
                </div>
              </div>
              <div className="shift-lists mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div>Ngay thuong</div>
                  <div>{"100%"}</div>
                  <div>he so luong</div>
                </div>
                {wageScale.map((scale, index) => {
                  return (
                    <div className="flex items-center gap-4" key={index}>
                      <input
                        type="text"
                        value={scale.name}
                        onChange={(e) =>
                          changeWageScaleName(e.target.value, index)
                        }
                      />
                      <input
                        type="number"
                        value={scale.scale}
                        onChange={(e) =>
                          changeWageScaleValue(Number(e.target.value), index)
                        }
                      />

                      <button
                        className="px-2 py-1 shadow shadow-gray-400 rounded-md"
                        onClick={() => removeWageScale(index)}
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  );
                })}
                <div className="text-center flex items-center justify-center mt-2">
                  <AiOutlinePlus
                    onClick={addNewScale}
                    size={48}
                    className="text-gray-400 p-2 rounded-md"
                    style={{ border: "1px solid #dadada" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-20"></div>
          <div className="fixed bottom-4 left-0 right-0 px-8">
            <div
              className="px-4 py-1 rounded-lg text-white bg-blue-600 flex items-center justify-center h-12 text-lg"
              onClick={handleSettingWage}
            >
              Tao bang luong
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {autoCheckPopup && (
        <PopupWrapper onClose={() => setAutoCheckPopup(false)}>
          <AutoCheckPopup
            sendData={() => setDayMap([...dayMap])}
            days={dayMap}
          />
        </PopupWrapper>
      )}

      <WageInfo active={wageInfo} onClose={() => setWageInfo(false)} />
    </>
  );
}

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

export interface ICreateWorkPageProps {}

export default function CreateWorkPage(props: ICreateWorkPageProps) {
  const [tab, setTab] = React.useState(0);
  const navigate = useNavigate();

  const handleGetPermisson = async () => {
    // setCookie("used", true, 99999);
    await setCache([{ key: "used", value: true }]);
    await setCache([{ key: "used2", value: true }]);
    navigate("/get-permisson");
  };

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
  const [workShifts, setWorkShifts] = React.useState([
    JSON.parse(JSON.stringify(defaultShift)),
  ]);

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

  React.useEffect(() => {
    console.log("workShifts", workShifts);
  }, [workShifts]);

  return (
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
                  <input type="checkbox" className="h-10" />
                </div>
                <div>
                  <p className="text-lg font-medium text-blue-700">
                    Gio den co dinh
                  </p>
                  <p className="text-sm text-blue-400">Bo qua cham cong den</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div>
                  <input type="checkbox" className="h-10" />
                </div>
                <p className="text-lg font-medium text-blue-700">
                  Tu dong cham cong
                </p>
                <div onClick={() => setAutoCheckPopup(true)}>
                  <div className="w-7 h-7 bg-blue-600 rounded-full"></div>
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
        </div>
      </div>
    </div>
  );
}

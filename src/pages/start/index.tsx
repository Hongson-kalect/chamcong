import * as React from "react";
import StartTabImage from "./ui/image";
import StartTabInfo from "./ui/info";
import { Button } from "@/components/ui/button";
import { useNavigate } from "zmp-ui";
import { setCookie } from "@/lib/utils";
import { setCache } from "@/store/native.store";

export interface IStartPageProps {}

export default function StartPage(props: IStartPageProps) {
  const [tab, setTab] = React.useState(0);
  const navigate = useNavigate();

  const handleGetPermisson = async () => {
    // setCookie("used", true, 99999);
    await setCache([{ key: "used", value: true }]);
    await setCache([{ key: "used2", value: true }]);
    navigate("/get-permisson");
  };

  return (
    <div className="bg-white flex flex-col items-center gap-12  px-6 pb-8 h-full">
      <div className="image mt-8 w-full flex-1">
        <StartTabImage tab={tab} setTab={setTab} />
      </div>

      <div className="flex items-center gap-3 h-5 justify-center">
        <div
          onClick={() => setTab(0)}
          className={`rounded-full duration-200 ${
            tab === 0 ? "bg-blue-700 h-4 w-4" : "bg-gray-200 h-3 w-3"
          }`}
        ></div>
        <div
          onClick={() => setTab(1)}
          className={`rounded-full duration-200 ${
            tab === 1 ? "bg-blue-700 h-4 w-4" : "bg-gray-200 h-3 w-3"
          }`}
        ></div>
        <div
          onClick={() => setTab(2)}
          className={`rounded-full duration-200 ${
            tab === 2 ? "bg-blue-700 h-4 w-4" : "bg-gray-200 h-3 w-3"
          }`}
        ></div>
      </div>
      <div className="info">
        <StartTabInfo tab={tab} />
      </div>
      <Button
        className="bg-blue-600 text-white text-lg h-14 rounded-2xl w-full"
        onClick={handleGetPermisson}
      >
        {" "}
        Tiếp tục
      </Button>
      {/* <div className="text-red-400">Tiếp tục</div> */}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useNavigate } from "zmp-ui";
import { getUserPermisson } from "./_utils/_api";
import { useAppStore } from "@/store/app.store";
import { checkUserInfo } from "@/lib/utils";
import { setCache } from "@/store/native.store";
import zaloAccessImg from "@/asset/images/zaloAccess.png";

export interface IGetPerMissonPageProps {}

export default function GetPerMissonPage(props: IGetPerMissonPageProps) {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const getPermisson = async () => {
    const permisson = await getUserPermisson();
    console.log("permisson", permisson);
    if (permisson) {
      const userInfo = await checkUserInfo();
      setCache([{ key: "userInfo", value: userInfo }]);
      console.log("dì dợ", userInfo);
      navigate("/");
    }
  };

  return (
    <div className="bg-white flex flex-col items-center gap-12  px-6 py-8 h-full">
      <div className="image mt-8 w-full flex-1">
        <div className="w-full h-full bg-blue-300">
          <img
            className="image w-full h-full"
            style={{
              background: `url(${zaloAccessImg}) center center / cover no-repeat `,
            }}
          ></img>
        </div>
      </div>
      <p className="title font-semibold text-[26px] text-center text-gray-950">
        Yêu cầu truy cập
      </p>
      <p className="detail px-5 text-centertext-sm text-gray-700">
        Chúng tôi cần truy cập dữ liệu zalo của bạn để sử xác thực danh tính và
        bắt đầu chương trình.
      </p>
      <div className="options flex w-full gap-6">
        <Button
          className="bg-blue-600 text-white text-lg h-14 rounded-2xl flex-1"
          onClick={getPermisson}
        >
          Đồng ý
        </Button>
        <Button
          className="border border-solid border-red-400 font-light text-red-400 text-lg h-14 rounded-2xl w-1/3"
          onClick={() => alert("Thoát app")}
        >
          Thoát
        </Button>
      </div>
      <p className="font-light text-gray-400 text-sm">
        Đồng ý đồng nghĩa với bạn đã chấp nhận các{" "}
        <span
          className="font-medium text-blue-600 px-1"
          onClick={() => navigate("/dieu-khoan")}
        >
          Điều khoản
        </span>{" "}
        của chúng tôi
      </p>
    </div>
  );
}

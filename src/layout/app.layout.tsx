import { checkUserInfo, checkUserPermisson, getCookie } from "@/lib/utils";
import { useAppStore } from "@/store/app.store";
import { getCache, setCache } from "@/store/native.store";
import { UserInfoType } from "@/utils/interface";
import { useApi } from "@/utils/useApi";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Outlet, replace } from "react-router-dom";
import { getUserID } from "zmp-sdk";
import { getUserInfo } from "zmp-sdk/apis";
import { useNavigate } from "zmp-ui";

export interface IAppLayoutProps {}

export default function AppLayout(props: IAppLayoutProps) {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const { login, register } = useApi();

  // const [used, setUsed] = React.useState(async () => await getCache(["used"]));
  const userZaloInfo = useQuery({
    queryFn: async () => await getUserInfo(),
    queryKey: ["used"],
  });

  React.useEffect(() => {
    if (userZaloInfo.status === "pending") return;
    if (userZaloInfo.data) {
      handleLogin(userZaloInfo.data);
    }
  }, [userZaloInfo]);

  const handleLogin = async (userData: UserInfoType) => {
    try {
      const res = await login();
      if (res) {
        setUserInfo({ ...userData, access_token: res.access_token });
      } else {
        const res = await register();
        if (res) {
          setUserInfo({ ...userData, access_token: res.access_token });
          navigate("/start", { replace: true });
        } else {
          console.log("Meos tao dc tai khoan");
        }
      }
    } catch (error) {
      console.log("error login :>> ", error);
    }
  };

  const permisson = useQuery({
    queryFn: checkUserPermisson,
    queryKey: ["permisson"],
  });

  React.useEffect(() => {
    //đang load thì ko xử lý
    if (permisson.status === "pending") return;
    console.log("permisson", permisson.data);
    if (!permisson.data) {
      //Nếu ko có hàm cần thiết
      //Hay cho nó thành pop up nhẩy
      navigate("/get-permisson", { replace: true });
    }
  }, [permisson.data]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div>
        <div className="status-bar h-10 bg-gradient-to-r from-blue-600 to-blue-800 w-screen"></div>
      </div>
      <div className="flex-1">
        {permisson.isPending || userZaloInfo.isPending ? (
          <div>Loading</div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

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
    queryFn: async () => {
      console.log("111", 111);
      return await getUserInfo();
    },
    queryKey: ["used"],
  });

  React.useEffect(() => {
    console.log("2", userZaloInfo);
    if (userZaloInfo.status === "pending") return;
    setUserInfo({ ...userZaloInfo.data?.userInfo });
    if (userZaloInfo.data) {
      handleLogin(userZaloInfo.data?.userInfo);
    }
  }, [userZaloInfo.data]);
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handle login with user data from zalo sdk
   * If user not have account, will register and then login
   * @param userData - user data from zalo sdk
   */
  /******  1bb70bf2-93a5-449a-8fa5-3641e56c28bf  *******/

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handle login with user data from zalo sdk
   * If user not have account, will register and then login
   * @param userData - user data from zalo sdk
   */
  /******  f334da69-bb3a-4a87-a504-33f285cf6f1c  *******/ const handleLogin =
    async (userData: UserInfoType) => {
      try {
        console.log("userData", userData);
        const res = await login(userData.id);
        if (res) {
          setUserInfo({ ...userData, access_token: res.access_token });
        } else {
        }
      } catch (error) {
        if (error.status === 404) {
          const res = await register(userData);
          if (res) {
            setUserInfo({ ...userData, access_token: res.access_token });
            navigate("/start", { replace: true });
          } else {
            console.log("Meos tao dc tai khoan");
          }
        }
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
      {/* <div>
        <div className="status-bar h-10 bg-blue-950 w-screen"></div>
      </div> */}
      <div className="flex-1 bg-[#f5f5f5]">
        {permisson.isPending || userZaloInfo.isPending ? (
          <div>Loading</div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

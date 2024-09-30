import { checkUserInfo, checkUserPermisson, getCookie } from "@/lib/utils";
import { useAppStore } from "@/store/app.store";
import { getCache, setCache } from "@/store/native.store";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "zmp-ui";

export interface IAppLayoutProps {}

export default function AppLayout(props: IAppLayoutProps) {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  // const [used, setUsed] = React.useState(async () => await getCache(["used"]));
  const used = useQuery({
    queryFn: async () => await getCache("used"),
    queryKey: ["used"],
  });
  console.log("used", used.data);

  const permisson = useQuery({
    queryFn: checkUserPermisson,
    queryKey: ["permisson"],
  });

  const checkUser = useQuery({
    queryFn: checkUserInfo,
    queryKey: ["userInfo"],
  });

  React.useEffect(() => {
    //đang load thì ko xử lý
    if (used.status === "pending") return;
    if (!used.data) {
      setCache([{ key: "used", value: true }]);
      navigate("/start", { replace: true });
    }
  }, [permisson.data]);

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

  React.useEffect(() => {
    //dang load thì ko xử lý
    if (checkUser.status === "pending") return;

    console.log("checkUser", checkUser.data);
    if (checkUser.data) {
      setUserInfo(checkUser.data);
    } else {
    }
  }, [checkUser.data]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div>
        <div className="status-bar h-10 bg-gradient-to-r from-blue-600 to-blue-800 w-screen"></div>
      </div>
      <div className="flex-1">
        {permisson.isPending || checkUser.isPending ? (
          <div>Loading</div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

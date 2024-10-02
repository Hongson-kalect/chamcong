import { useAppStore } from "@/store/app.store";
import { removeCache } from "@/store/native.store";
import * as React from "react";
import { Button, useNavigate } from "zmp-ui";
import { useHomeApi } from "./_utils/_api";
import { useQuery } from "@tanstack/react-query";
import { Input } from "antd";
import { PopupWrapper } from "../taobangcong/popup/workShiftDetail";
import CreateWorkPage from "./popup/createWorkpage";
import { WorkPageType } from "./_utils/_interface";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const navigate = useNavigate();
  const { getWorkShift } = useHomeApi();
  const { userInfo } = useAppStore();
  const [workPage, setWorkPage] = React.useState<WorkPageType>({}); //coi la dang co 1 workpage rong
  const [createWorkPage, setCreateWorkPage] = React.useState(false);
  // const [workShift,setWorkShift] =React.useState();

  const workShiftQuery = useQuery({
    queryFn: getWorkShift,
    queryKey: ["getWorkShift", userInfo],
  });

  React.useEffect(() => {
    if (workShiftQuery.status === "pending") return;
    if (!workShiftQuery.data.result) {
      setCreateWorkPage(true);
    } else {
      setWorkPage(workShiftQuery.data.result);
    }
  }, []);

  const createBasicWorkPage = async () => {
    alert("createBasicWorkPage");
  };

  const sendData = (workpage) => {
    setWorkPage(workpage);
    setCreateWorkPage(false);
  };
  // const createWorkPage = async () => {
  //   navigate("/create-work-page");
  // };
  return (
    <div>
      Trang home nè
      <Button onClick={() => alert("adsad")}>ádsad</Button>
      {!workPage ? (
        <PopupWrapper onClose={() => alert("close popup")}>
          <CreateWorkPage sendData={sendData} />
        </PopupWrapper>
      ) : null}
    </div>
  );
}

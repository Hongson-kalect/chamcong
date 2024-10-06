import { useAppStore } from "@/store/app.store";
import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "zmp-ui";

export interface ISideBarProps {}

const SideBarWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100vw;
  z-index: 10;
`;

export default function SideBar(props: ISideBarProps) {
  const { popup, setPopup } = useAppStore();
  return (
    <SideBarWrapper
      className={`${popup ? "" : "-translate-x-[100%]"} duration-200`}
    >
      <div className="bg-white w-[80%] h-full" style={{ maxWidth: "720px" }}>
        <div className="h-36 bg-gray-400"></div>

        <div className="p-2 mt-2">
          <SideBarItem title="Cham cong" link="/" />
          <SideBarItem title="Xem cau hinh bang cong" link="/bangcong" />
          <SideBarItem title="Cai dat kieu ngay" />
          <SideBarItem title="Cai dat bang luong" />
        </div>
      </div>
      <div
        className="overlay flex-1 bg-[#00000088]"
        onClick={() => setPopup(false)}
      ></div>
    </SideBarWrapper>
  );
}

type SidebarItemProp = {
  icon?: React.ReactElement;
  title: string;
  link?: string;
};

export const SideBarItem = (props: SidebarItemProp) => {
  const navigate = useNavigate();
  const { setPopup } = useAppStore();

  const handleClick = () => {
    if (props.link) {
      navigate(props.link);
      setPopup(false);
    }
  };

  return (
    <div className="flex px-2 py-2.5" onClick={handleClick}>
      <div>{props?.icon}</div>
      <div className="font-medium text-gray-600">{props.title}</div>
    </div>
  );
};

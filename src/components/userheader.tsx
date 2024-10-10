import { useAppStore } from "@/store/app.store";
import * as React from "react";

export interface IUserHeaderProps {}

export default function UserHeader(props: IUserHeaderProps) {
  const { setPopup, userInfo } = useAppStore();
  return (
    <div className="flex items-center justify-between px-2 py-1 mb-2">
      <div
        className="user flex gap-4 items-center"
        onClick={() => setPopup(true)}
      >
        <img className="h-12 w-12 rounded bg-black" src={userInfo.avatar} />
        <div>
          <p className="text-sm text-slate-300 opacity-80">Cong nhan</p>
          <p className="text-lg text-white font-semibold opacity-90">
            Cong ty A
          </p>
        </div>
      </div>
      {/* <div className="flex gap-2">
        <img className="h-10 w-10 rounded-full" src={userInfo.avatar} />
        <div className="h-10 w-4 rounded-lg bg-red-400" />
      </div> */}
    </div>
  );
}

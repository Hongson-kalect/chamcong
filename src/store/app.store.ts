import { UserInfoType } from "@/utils/interface";
import { create } from "zustand";

type IAppStore = {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: any) => void;
};

export const useAppStore = create<IAppStore>((set) => ({
  userInfo: { avatar: "", id: "", name: "" },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

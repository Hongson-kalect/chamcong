import { UserInfoType } from "@/utils/interface";
import { create } from "zustand";

type IAppStore = {
  userInfo: UserInfoType;
  popup: boolean;
  setUserInfo: (userInfo: any) => void;
  setPopup: (data: boolean) => void;
};

export const useAppStore = create<IAppStore>((set) => ({
  userInfo: { avatar: "", id: "", name: "" },
  popup: false,
  setUserInfo: (userInfo) => set({ userInfo }),
  setPopup: (data) => set({ popup: data }),
}));

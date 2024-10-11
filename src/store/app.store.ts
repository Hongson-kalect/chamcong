import { UserInfoType } from "@/utils/interface";
import { create } from "zustand";

type IAppStore = {
  userInfo: UserInfoType;
  popup: boolean;
  setUserInfo: (userInfo: any) => void;
  setShowNavbar: (data: boolean) => void;
};

export const useAppStore = create<IAppStore>((set) => ({
  userInfo: { avatar: "", id: "", name: "" },
  popup: false,
  setUserInfo: (userInfo) => set({ userInfo }),
  setShowNavbar: (data) => set({ popup: data }),
}));

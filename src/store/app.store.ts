import { UserInfoType } from "@/utils/interface";
import { create } from "zustand";

type IAppStore = {
  userInfo: UserInfoType;
  setUserInfo: (userInfo: any) => void;
};

export const useAppStore = create<IAppStore>((set) => ({
  userInfo: { avatar: "", zalo_id: "" },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

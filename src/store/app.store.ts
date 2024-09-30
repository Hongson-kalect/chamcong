import { create } from "zustand";

type IAppStore = {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
};

export const useAppStore = create<IAppStore>((set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set({ userInfo }),
}));

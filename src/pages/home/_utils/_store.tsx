import { create } from "zustand";
import { WorkPageType } from "./_interface";

type IHomeStore = {
  workState: null | "checked" | "dayOff";
  setWorkState: (data: null | "checked" | "dayOff") => void;
  workPage?: WorkPageType;
  setWorkPage: (data: WorkPageType) => void;
};

export const useHomeStore = create<IHomeStore>((set) => ({
  workState: null,
  setWorkState: (data) => set({ workState: data }),
  workPage: undefined,
  setWorkPage: (data) => set({ workPage: data }),
}));

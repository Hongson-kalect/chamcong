import { create } from "zustand";
import { WorkDateType, WorkPageType } from "./_interface";

type IHomeStore = {
  workState?: "checked" | "dayOff" | null;
  workPage?: WorkPageType;
  selectedWorkDate?: WorkDateType;
  setWorkState: (data?: "checked" | "dayOff" | null) => void;
  setWorkPage: (data: WorkPageType) => void;
  setSelectedWorkDate: (data: WorkDateType) => void;
};

export const useHomeStore = create<IHomeStore>((set) => ({
  workState: undefined,
  workPage: undefined,
  selectedWorkDate: undefined,
  setWorkState: (data) => set({ workState: data || undefined }),
  setWorkPage: (data) => set({ workPage: data }),
  setSelectedWorkDate: (data) => set({ selectedWorkDate: data }),
}));

import { create } from "zustand";
import { IKieuCa, IKieuNgay, WorkDateType, WorkPageType } from "./_interface";

type IHomeStore = {
  workState?: "checked" | "dayOff" | null;
  workPage?: WorkPageType;
  selectedWorkDate?: WorkDateType;
  kieucas?: IKieuCa[];
  kieungays?: IKieuNgay[];
  setWorkState: (data?: "checked" | "dayOff" | null) => void;
  setWorkPage: (data: WorkPageType) => void;
  setSelectedWorkDate: (data: WorkDateType) => void;
  setKieuCa: (data: IKieuCa[]) => void;
  setKieuNgay: (data: IKieuNgay[]) => void;
};

export const useHomeStore = create<IHomeStore>((set) => ({
  workState: undefined,
  workPage: undefined,
  selectedWorkDate: undefined,
  kieucas: undefined,
  kieungays: undefined,
  setWorkState: (data) => set({ workState: data || undefined }),
  setWorkPage: (data) => set({ workPage: data }),
  setSelectedWorkDate: (data) => set({ selectedWorkDate: data }),
  setKieuCa: (data) => set({ kieucas: data }),
  setKieuNgay: (data) => set({ kieungays: data }),
}));

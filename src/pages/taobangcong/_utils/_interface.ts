export type WorkShiftType = {
  name: string;
  start: number;
  end: number;
  phase: number[];
  detail: {
    scale: number;
    rest: number;
    bonus?: {
      name: string;
      value: number;
      unit: string | number;
      condition: number;
    }[];
  }[];
};

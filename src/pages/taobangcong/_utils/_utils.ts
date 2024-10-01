import { WorkShiftType } from "./_interface";

export const defaultShift: WorkShiftType = {
  name: "Ca ngay",
  start: 480,
  end: 1080,
  phase: [480, 1080],
  detail: [
    {
      scale: 100,
      rest: 60,
      bonus: [],
    },
  ],
};

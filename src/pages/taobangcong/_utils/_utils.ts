import { unitless } from "antd/es/theme/useToken";
import { WorkShiftType, WorkWageType } from "./_interface";

export const defaultShift: WorkShiftType = {
  name: "Ca ngay",
  start: 480,
  end: 1080,
  phase: [480],
  detail: [
    {
      scale: 100,
      rest: 60,
      bonus: [],
    },
  ],
};

export const defaultWage: WorkWageType = {
  baseWage: 6000000,
  lifeBonus: 400000,

  asunrance: 10,
  bonus: [
    {
      name: "Chuyen can",
      value: 1000000,
      unit: "vnd",
      condition: {
        type: "nghi",
        rate: [0, 1, 2, 3],
        value: [100, 90, 80, 0],
      },
    },
    {
      name: "Xang xe",
      value: 200000,
      unit: "vnd",
    },
  ],

  deduct: [
    {
      name: "Bao hiem",
      value: 10,
      unit: "%",
    },
    {
      name: "Cong doan",
      value: 200000,
      unit: "vnd",
    },
  ],
};

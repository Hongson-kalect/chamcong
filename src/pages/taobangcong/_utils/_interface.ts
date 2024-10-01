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

export type WorkWageType = {
  baseWage: number;
  lifeBonus: number;
  asunrance: number;
  bonus: {
    name: string;
    value: number;
    unit: string | number;
    condition?: {
      type: string;
      rate: number | number[];
      value: number | number[];
    };
  }[];

  deduct: {
    name: string;
    value: number;
    unit: string;
  }[];
};

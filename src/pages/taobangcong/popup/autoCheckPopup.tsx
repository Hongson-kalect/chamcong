import * as React from "react";

export interface IAutoCheckPopupProps {
  sendData: () => void;
  days: { day: number; selected: boolean }[];
}

export default function AutoCheckPopup(props: IAutoCheckPopupProps) {
  return <div className="bg-white">cai nay laf ay tich eck popu</div>;
}

import { IHeSo } from "@/pages/home/_utils/_interface";
import * as React from "react";

export interface IHesoLuongProps {
  heso: IHeSo | null;
}

export default function HesoLuong(props: IHesoLuongProps) {
  const [heso, setHeso] = React.useState<IHeSo | null>(
    props.heso ? JSON.parse(JSON.stringify(props.heso)) : null
  );

  if (!heso) return <div className="bg-white">Tao he sao</div>;
  return <div className="bg-white">Sua he so {heso.id}</div>;
}

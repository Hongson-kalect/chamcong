import { IKieuCa } from "@/pages/home/_utils/_interface";
import * as React from "react";
import { Input } from "zmp-ui";
import { useBangCongApi } from "../utils/_api";
import homeQuery from "@/pages/home/_utils/_query";

export interface IKieucaProps {
  kieuca: IKieuCa | null;
  onClose: () => void;
}

export default function Kieuca(props: IKieucaProps) {
  const { workShiftQuery } = homeQuery();
  const { taoKieuca, suaKieuca } = useBangCongApi();
  const formAction = React.useMemo(() => {
    return props.kieuca ? "edit" : "create";
  }, []);
  const [kieuca, setKieuca] = React.useState<IKieuCa>(
    props.kieuca
      ? JSON.parse(JSON.stringify(props.kieuca))
      : {
          tenca: "",
          ghichu: "",
        }
  );

  const FormAction = (second) => {
    if (formAction === "edit") {
      suaKieuca(kieuca);
    } else {
      taoKieuca(kieuca);
    }

    workShiftQuery.refetch();
    props.onClose();
  };

  return (
    <div className="px-4">
      <div className="rounded-lg bg-white">
        <p
          className="text-xl py-1  p-2 text-center"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          {formAction === "edit" ? "Sửa kiểu ca" : "Tạo ca mới"}
        </p>

        <div className="p-4">
          <div>
            <Input
              placeholder="Tên ca"
              className="border-none shadow-none outline-none"
              type="text"
              value={kieuca?.tenca}
              onChange={(e) => setKieuca({ ...kieuca, tenca: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <Input
              placeholder="Ghi chú"
              className="border-none shadow-none outline-none"
              type="text"
              value={kieuca?.ghichu}
              onChange={(e) => setKieuca({ ...kieuca, ghichu: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-center mt-8">
            <button
              className="px-8 py-2 rounded-xl bg-blue-600 text-white text-lg"
              onClick={FormAction}
            >
              {formAction === "edit" ? "Xác nhận" : "Xác nhận"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

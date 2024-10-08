import { IHeSo, IKieuCa } from "@/pages/home/_utils/_interface";
import * as React from "react";
import { Input } from "zmp-ui";
import { useBangCongApi } from "../utils/_api";
import homeQuery from "@/pages/home/_utils/_query";

export interface IHesoluong {
  heso: IHeSo | null;
  kieuca: number;
  kieungay: number;
  onClose: () => void;
}

export default function Hesoluong(props: IHesoluong) {
  const { workShiftQuery } = homeQuery();

  console.log("props.kieuca, props.kieungay", props.kieuca, props.kieungay);

  const [kieungay, kieuca] = React.useMemo(() => {
    const kieucaRef = workShiftQuery.data?.kieucas.find(
      (item) => item.id === props.kieuca
    );
    const kieungayRef = workShiftQuery.data?.kieungays.find(
      (item) => item.id === props.kieungay
    );
    return [kieungayRef, kieucaRef];
  }, [workShiftQuery.data]);
  const { taoHeso, suaHeso } = useBangCongApi();

  const formAction = React.useMemo(() => {
    return props.heso?.kieuca && props.heso?.kieungay ? "edit" : "create";
  }, []);
  const [heso, setKieuca] = React.useState<IHeSo>(
    props.heso
      ? JSON.parse(JSON.stringify(props.heso))
      : {
          batdau: "08:00:00",
          ketthuc: "17:00:00",
          ghichu: "",
          kieuca: kieuca?.id,
          kieungay: kieungay?.id,
          heso: 1.0,
        }
  );

  const FormAction = (second) => {
    if (formAction === "edit") {
      suaHeso(heso);
    } else {
      taoHeso(heso);
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
          {formAction === "edit" ? "Sửa hệ số" : "Tạo hệ số"}
        </p>

        <div className="p-4">
          <div>
            <div className="flex  px-4 items-center gap-2">
              <p className="w-12">Ngay</p>
              <p className="text-base font-medium text-gray-400">
                {kieungay?.tenloaingay}
              </p>
            </div>
            <div className="flex px-4 items-center gap-2 mt-1">
              <p className="w-12">Ca</p>
              <p className="text-base font-medium text-gray-400">
                {kieuca?.tenca}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-evenly gap-4 mt-4">
            <div className="flex items-center justify-center gap-2">
              <p className="w-23">Tu:</p>
              <input
                placeholder="Bat dau"
                className="border-none shadow-none outline-none font-medium text-blue-500 text-base"
                type="time"
                value={heso?.batdau}
                onChange={(e) => setKieuca({ ...heso, batdau: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="w-23">Den:</p>
              <input
                // placeholder="Ghi chú"
                className="border-none shadow-none outline-none font-medium text-blue-500 text-base"
                type="time"
                value={heso?.ketthuc}
                onChange={(e) =>
                  setKieuca({ ...heso, ketthuc: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 px-5">
            <p className="w-23">He so:</p>
            <input
              placeholder="H"
              className="border-none shadow-none outline-none font-medium text-blue-500 text-base"
              type="number"
              value={heso?.heso}
              onChange={(e) =>
                setKieuca({ ...heso, heso: Number(e.target.value) })
              }
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

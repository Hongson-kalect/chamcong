import { IKieuNgay } from "@/pages/home/_utils/_interface";
import * as React from "react";
import { Input } from "zmp-ui";
import { useBangCongApi } from "../utils/_api";
import homeQuery from "@/pages/home/_utils/_query";

export interface IKieungayProps {
  kieungay: IKieuNgay | null;
  onClose: () => void;
}

export default function Kieungay(props: IKieungayProps) {
  const { taoKieungay, suaKieungay } = useBangCongApi();
  const { workShiftQuery } = homeQuery();

  const formAction = React.useMemo(() => {
    return props.kieungay ? "edit" : "create";
  }, []);
  const [kieungay, setKieungay] = React.useState<IKieuNgay>(
    props.kieungay
      ? JSON.parse(
          JSON.stringify({
            ...props.kieungay,
            ngaytrongtuan: props?.kieungay?.ngaytrongtuan
              ? JSON.parse([props.kieungay.ngaytrongtuan])
              : [],
          })
        )
      : {
          tenloaingay: "",
          ngaycuthe: null,
          cochuyencan: false,
          ngaytrongtuan: [],
          ghichu: "",
        }
  );

  console.log("kieungay", kieungay, props.kieungay);

  const FormAction = async () => {
    if (formAction === "edit") {
      await suaKieungay(kieungay);
    } else {
      await taoKieungay(kieungay);
    }

    await workShiftQuery.refetch();
    props.onClose();
  };

  const toggleDate = (day: number) => {
    const tempList = [...kieungay.ngaytrongtuan];
    const tempDay = tempList.indexOf(day);
    if (tempDay >= 0) {
      tempList.splice(tempDay, 1);
    } else {
      tempList.push(day);
    }
    setKieungay({ ...kieungay, ngaytrongtuan: [...tempList] });
  };

  return (
    <div className="px-4">
      <div className="rounded-lg bg-white">
        <p
          className="text-xl py-1  p-2 text-center"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          {formAction === "edit" ? "Sửa kiểu ngay" : "Tạo ngay mới"}
        </p>

        <div className="p-4">
          <div>
            <Input
              placeholder="Tên kiểu ngày"
              className="border-none shadow-none outline-none"
              type="text"
              value={kieungay?.tenloaingay}
              onChange={(e) =>
                setKieungay({ ...kieungay, tenloaingay: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <Input
              placeholder="Ghi chú"
              className="border-none shadow-none outline-none"
              type="text"
              value={kieungay?.ghichu}
              onChange={(e) =>
                setKieungay({ ...kieungay, ghichu: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-3 py-2">
            <input
              checked={kieungay.cochuyencan}
              onChange={() =>
                setKieungay({ ...kieungay, cochuyencan: !kieungay.cochuyencan })
              }
              type="checkbox"
              name="chuyencan"
              className="h-4 w-4"
              id="chuyencan"
            />
            <label
              htmlFor="chuyencan"
              className="text-lg font-medium text-gray-600"
            >
              Tính chuyên cần
            </label>
          </div>
          <div>
            <p className="mt-4 font-medium text-gray-400">Ngày trong tuần</p>
            <div className="flex items-center justify-between mt-3 px-2 gap-1">
              <div
                onClick={() => toggleDate(1)}
                className={`flex-1 rounded-lg bg-blue-600 text-center py-2 font-medium text-white ${
                  kieungay.ngaytrongtuan.includes(1) ? "" : "opacity-20"
                }`}
              >
                T2
              </div>
              <div
                onClick={() => toggleDate(2)}
                className={`flex-1 rounded-lg bg-blue-600 text-center py-2 font-medium text-white ${
                  kieungay.ngaytrongtuan.includes(2) ? "" : "opacity-20"
                }`}
              >
                T3
              </div>
              <div
                onClick={() => toggleDate(3)}
                className={`flex-1 rounded-lg bg-blue-600 text-center py-2 font-medium text-white ${
                  kieungay.ngaytrongtuan.includes(3) ? "" : "opacity-20"
                }`}
              >
                T4
              </div>
              <div
                onClick={() => toggleDate(4)}
                className={`flex-1 rounded-lg bg-blue-600 text-center py-2 font-medium text-white ${
                  kieungay.ngaytrongtuan.includes(4) ? "" : "opacity-20"
                }`}
              >
                T5
              </div>
              <div
                onClick={() => toggleDate(5)}
                className={`flex-1 rounded-lg bg-blue-600 text-center py-2 font-medium text-white ${
                  kieungay.ngaytrongtuan.includes(5) ? "" : "opacity-20"
                }`}
              >
                T6
              </div>
              <div
                onClick={() => toggleDate(6)}
                className={`flex-1 rounded-lg bg-orange-600 text-center py-2 font-medium text-white ${
                  kieungay.ngaytrongtuan.includes(6) ? "" : "opacity-20"
                }`}
              >
                T7
              </div>
              <div
                onClick={() => toggleDate(0)}
                className={`flex-1 rounded-lg bg-red-600 text-center py-2 font-medium text-white ${
                  kieungay.ngaytrongtuan.includes(0) ? "" : "opacity-20"
                }`}
              >
                CN
              </div>
            </div>
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

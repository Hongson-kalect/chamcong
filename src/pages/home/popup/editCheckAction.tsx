import { Select, TimePicker } from "antd";
import * as React from "react";
import { useHomeStore } from "../_utils/_store";
import { useHomeApi } from "../_utils/_api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { getDate } from "@/lib/utils";
import { WorkDateType } from "../_utils/_interface";

export interface IEditCheckActionProps {
  todayInfo?: WorkDateType;
  onClose: () => void;
}

export default function EditCheckAction({
  todayInfo,
  onClose,
}: IEditCheckActionProps) {
  const [info, setInfo] = React.useState(JSON.parse(JSON.stringify(todayInfo)));
  //Lay duoc du lieu bang cong hien tai cua nguoi dung
  const { setWorkState, workPage, setWorkPage } = useHomeStore();
  const { editCheckDate } = useHomeApi();

  const [cas, kieungays] = React.useMemo(() => {
    const ca = workPage?.kieucas.map((kieuca) => ({
      label: kieuca.tenca,
      value: kieuca.id,
    }));
    const kieungay = workPage?.kieungays.map((kieungay) => ({
      label: kieungay.tenloaingay,
      value: kieungay.id,
    }));
    return [ca, kieungay];
  }, [workPage]);

  console.log("info", info, todayInfo, cas, kieungays);

  const handleEditCheckAction = async () => {
    try {
      console.log("workPage", workPage);
      if (!workPage) return toast.error("Chua co bang cong nao");
      if (!todayInfo?.ca || !todayInfo.kieungay)
        return toast.error("Hay chon kieu ca va kieu ngay");
      await editCheckDate({ ...info, tuchamcong: workPage.id });
      setWorkState("checked");
      toast.success("Sua du lieu thanh cong");

      onClose();
    } catch (error) {
      toast.error("Sua du lieu khong thanh cong");
    }
  };

  return (
    <div className="px-4">
      <div className="bg-white rounded-lg p-2">
        <div className="text-center text-xl font-medium">Cham cong</div>

        <div className="flex items-center justify-center gap-2">
          <p>Ca lam</p>
          <Select
            className="w-1/2"
            value={info?.ca}
            onChange={(value) => {
              setInfo({ ...info, kieuca: value });
            }}
            options={cas || []}
          />
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Kieu ngay</p>
          <Select
            value={info.kieungay}
            onChange={(value) => setInfo({ ...info, kieungay: value })}
            className="w-1/2"
            options={kieungays || []}
          />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 mt-2">
          <p>Gio den</p>
          <input
            type="datetime-local"
            className="w-1/2"
            value={info?.giovao.slice(0, 16)}
            onChange={(value) =>
              setInfo({
                ...info,
                giovao: value.target.value,
              })
            }
          />
        </div>

        <div className="flex flex-1 items-center justify-center gap-2 mt-2">
          <p>Gio ve</p>
          <input
            type="datetime-local"
            className="w-1/2"
            value={info?.giora.slice(0, 16)}
            onChange={(value) =>
              setInfo({
                ...info,
                giora: value.target.value,
              })
            }
          />
        </div>

        <textarea
          value={info.ghichu}
          onChange={(e) => setInfo({ ...info, ghichu: e.target.value })}
          placeholder="ghi chu"
          className=" w-full shadow shadow-red-400"
        ></textarea>
        <button
          className="w-full h-10 bg-blue-600 text-lg text-white mt-4 rounded-lg"
          onClick={handleEditCheckAction}
        >
          Xac nhan
        </button>
      </div>
    </div>
  );
}

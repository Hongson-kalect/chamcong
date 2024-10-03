import { Select, TimePicker } from "antd";
import * as React from "react";
import { useHomeStore } from "../_utils/_store";
import { useHomeApi } from "../_utils/_api";
import { getDate } from "@/lib/utils";

export interface IOffActionProps {
  onClose: () => void;
}

export default function OffAction(props: IOffActionProps) {
  //Lay duoc du lieu bang cong hien tai cua nguoi dung
  const { setWorkState, workPage, setWorkPage } = useHomeStore();
  const { checkDate, offDate } = useHomeApi();

  const [formValue, setFormValue] = React.useState({
    ngaycham: getDate(),
    kieunghi: undefined,
  });

  const handleOffAction = async () => {
    await offDate({ ...formValue, tuchamcong: workPage.id });
    setWorkState("dayOff");
    props.onClose();
  };

  const kieunghis = React.useMemo(() => {
    const kieucas = [
      { tenca: "Phep nam", id: 1 },
      { tenca: "Phep om", id: 2 },
      { tenca: "Nghi khong phep", id: 3 },
    ];
    const kieunhi = kieucas.map((kieuca) => ({
      label: kieuca.tenca,
      value: kieuca.id,
    }));
    setFormValue({
      ...formValue,
      kieunghi: kieunhi?.[0].value || 0,
    });
    return kieunhi;
    // const kieunhi = workPage?.kieucas.map((kieuca) => ({
    //   label: kieuca.tenca,
    //   value: kieuca.id,
    // }));
    // setFormValue({
    //   ...formValue,
    //   kieunghi: kieunghis?.[0].value || 0,
    // });
    // return [kieunhi];
  }, [workPage]);

  return (
    <div className="px-4">
      <div className="bg-white rounded-lg p-2">
        <div className="text-center text-xl font-medium">Nay nghi</div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Kieu nghi</p>
          <Select
            className="w-1/2"
            value={formValue.kieunghi}
            onChange={(val) => setFormValue({ ...formValue, kieunghi: val })}
            options={kieunghis}
          />
        </div>
        <button
          className="w-full h-10 bg-red-400 text-lg text-white mt-4 rounded-lg"
          onClick={handleOffAction}
        >
          Xac nhan
        </button>
      </div>
    </div>
  );
}

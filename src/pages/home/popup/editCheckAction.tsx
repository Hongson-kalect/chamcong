import { Select, TimePicker } from "antd";
import * as React from "react";
import { useHomeStore } from "../_utils/_store";
import { useHomeApi } from "../_utils/_api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { getDate } from "@/lib/utils";

export interface IEditCheckActionProps {
  onClose: () => void;
}

export default function EditCheckAction(props: IEditCheckActionProps) {
  //Lay duoc du lieu bang cong hien tai cua nguoi dung
  const { setWorkState, workPage, setWorkPage } = useHomeStore();
  const { checkDate } = useHomeApi();

  const [formValue, setFormValue] = React.useState({
    ca: 0,
    kieungay: 0,
    ngay: getDate(),
    giovao: getDate(undefined, "date") + "T08:00",
    giora: getDate(undefined, "date") + "T17:00",
    ghichu: "",
  });

  const [cas, kieungays] = React.useMemo(() => {
    const ca = workPage?.kieucas.map((kieuca) => ({
      label: kieuca.tenca,
      value: kieuca.id,
    }));
    const kieungay = workPage?.kieungays.map((kieungay) => ({
      label: kieungay.tenloaingay,
      value: kieungay.id,
    }));
    setFormValue({
      ...formValue,
      ca: ca?.[0].value || 0,
      kieungay: kieungay?.[0].value || 0,
    });
    return [ca, kieungay];
  }, [workPage]);

  const handleEditCheckAction = async () => {
    console.log("workPage", workPage);
    if (!workPage) return toast.error("Chua co bang cong nao");
    if (!formValue.ca || !formValue.ca)
      return toast.error("Hay chon kieu ca va kieu ngay");
    await checkDate({ ...formValue, tuchamcong: workPage.id });
    setWorkState("checked");

    props.onClose();
  };

  React.useEffect(() => {
    setFormValue({ ...formValue, ngay: formValue.giovao.slice(0, 10) });
  }, [formValue.giovao]);

  return (
    <div className="px-4">
      <div className="bg-white rounded-lg p-2">
        <div className="text-center text-xl font-medium">Cham cong</div>

        <div className="flex items-center justify-center gap-2">
          <p>Ca lam</p>
          <Select
            className="w-1/2"
            value={formValue.ca}
            onChange={(value) => setFormValue({ ...formValue, ca: value })}
            options={cas || []}
          />
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Kieu ngay</p>
          <Select
            value={formValue.kieungay}
            onChange={(value) =>
              setFormValue({ ...formValue, kieungay: value })
            }
            className="w-1/2"
            options={kieungays || []}
          />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 mt-2">
          <p>Gio den</p>
          <input
            type="datetime-local"
            className="w-1/2"
            value={formValue.giovao}
            onChange={(value) =>
              setFormValue({
                ...formValue,
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
            value={formValue.giora}
            onChange={(value) =>
              setFormValue({
                ...formValue,
                giora: value.target.value,
              })
            }
          />
        </div>

        <textarea
          value={formValue.ghichu}
          onChange={(e) =>
            setFormValue({ ...formValue, ghichu: e.target.value })
          }
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

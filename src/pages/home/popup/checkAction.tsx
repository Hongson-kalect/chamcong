import { Select, TimePicker } from "antd";
import * as React from "react";
import { useHomeStore } from "../_utils/_store";
import { useHomeApi } from "../_utils/_api";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export interface ICheckActionProps {
  onClose: () => void;
}

export default function CheckAction(props: ICheckActionProps) {
  //Lay duoc du lieu bang cong hien tai cua nguoi dung
  const { setWorkState, workPage, setWorkPage } = useHomeStore();
  const { checkDate } = useHomeApi();

  const [formValue, setFormValue] = React.useState({
    ca: "1",
    kieungay: "1",
    giovao: "2024-10-02T08:00",
    giora: "2024-10-02T17:00",
    ghichu: "",
  });
  const handleCheckAction = async () => {
    console.log("workPage", workPage);
    if (!workPage) return toast.error("Chua co bang cong nao");
    await checkDate({ ...formValue, tuchamcong: workPage.id });
    setWorkState("checked");

    props.onClose();
  };

  return (
    <div className="px-4">
      <div className="bg-white rounded-lg p-2">
        <div className="text-center text-xl font-medium">Cham cong</div>

        <div className="flex items-center justify-center gap-2">
          <p>Ca lam</p>
          <Select
            className="w-fit w-1/2"
            value={formValue.ca}
            onChange={(value) => setFormValue({ ...formValue, ca: value })}
            options={[
              { label: "Ca ngay", value: 1 },
              { label: "Ca dem", value: 2 },
              { label: "Ca ngay promax", value: 3 },
              { label: "Ca dem promax", value: 4 },
            ]}
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
            options={[
              { label: "Ngay thuong", value: 1 },
              { label: "Chu nhat", value: 2 },
              { label: "Ngay le", value: 3 },
              { label: "Le Promax", value: 4 },
            ]}
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
          onClick={handleCheckAction}
        >
          Xac nhan
        </button>
      </div>
    </div>
  );
}

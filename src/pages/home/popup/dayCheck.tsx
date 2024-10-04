import * as React from "react";
import homeQuery from "../_utils/_query";
import { getDate } from "@/lib/utils";
import { Select } from "zmp-ui";
import { useAppStore } from "@/store/app.store";
import { useHomeStore } from "../_utils/_store";
import { useHomeApi } from "../_utils/_api";
import { toast } from "react-toastify";

export interface IDayCheckProps {
  day: string;
  onClose: () => void;
}

const { Option } = Select;

export default function DayCheck(props: IDayCheckProps) {
  const { monthWorkQuery } = homeQuery();

  const selectedDate = React.useMemo(() => {
    if (monthWorkQuery.data) {
      return monthWorkQuery.data.find((dayInfo) => dayInfo.ngay === props.day);
    }
    return null;
  }, [props.day, monthWorkQuery.data]);

  if (!selectedDate) return <Check date={props.day} onClose={props.onClose} />;
  if (selectedDate.giovao)
    return <Edit date={props.day} onClose={props.onClose} />;
  return <div>Edit nghi</div>;
}

const Check = ({ date, onClose }: { date: string; onClose: () => void }) => {
  const { kieucas, kieungays } = useHomeStore();
  const { workShiftQuery, monthWorkQuery } = homeQuery();
  const { checkDate, offDate } = useHomeApi();

  const [workInfo, setWorkInfo] = React.useState({
    ngay: date,
    giora: date + "T08:00",
    giovao: date + "T17:00",
    ca: 0,
    kieungay: 0,
    ghichu: "",
  });

  const handleCheck = async () => {
    try {
      if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");
      await checkDate({ ...workInfo, tuchamcong: workShiftQuery.data?.id });

      onClose();
      toast.success("Cham bu thanh cong");
      monthWorkQuery.refetch();
    } catch (error) {
      toast.error("Looix oif");
    }
  };
  const handleOff = async () => {
    try {
      if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");
      await offDate({
        kieungay: workInfo.kieungay,
        ngay: workInfo.ngay,
        tuchamcong: workShiftQuery.data?.id,
      });

      onClose();
      toast.success("Cham bu thanh cong");
      monthWorkQuery.refetch();
    } catch (error) {
      toast.error("Looix oif");
    }
  };

  React.useEffect(() => {
    if (!kieucas?.length || !kieungays?.length) return;

    setWorkInfo((prev) => ({
      ...prev,
      ca: kieucas[0].id,
      kieungay: kieungays[0].id,
    }));
  }, [kieucas, kieungays]);

  return (
    <div className="px-2">
      <div className="bg-white rounded-lg">
        <div className="text-center text-xl font-medium">Cham bu</div>

        <div className="flex items-center justify-center gap-2">
          <p>Ca lam</p>
          <Select
            className="w-1/2"
            defaultValue={kieucas?.[0]?.id}
            value={workInfo.ca}
            onChange={(value) => setWorkInfo({ ...workInfo, ca: value })}
          >
            {kieucas &&
              kieucas.map((item, index) => {
                return (
                  <Option key={index} value={item.id} title={item.tenca} />
                );
              })}
          </Select>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Kieu ngay</p>
          <Select
            className="w-1/2"
            defaultValue={kieungays?.[0]?.id}
            value={workInfo.kieungay}
            onChange={(value) => setWorkInfo({ ...workInfo, kieungay: value })}
          >
            {kieungays &&
              kieungays.map((item, index) => {
                return (
                  <Option
                    key={index}
                    value={item.id}
                    title={item.tenloaingay}
                  />
                );
              })}
          </Select>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 mt-2">
          <p>Gio den</p>
          <input
            type="datetime-local"
            className="w-1/2"
            value={workInfo?.giovao?.slice(0, 16) || getDate() + "T08:00"}
            onChange={(value) =>
              setWorkInfo({
                ...workInfo,
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
            value={workInfo?.giora?.slice(0, 16) || getDate() + "T17:00"}
            onChange={(value) =>
              setWorkInfo({
                ...workInfo,
                giora: value.target.value,
              })
            }
          />
        </div>

        <textarea
          value={workInfo.ghichu}
          onChange={(e) => setWorkInfo({ ...workInfo, ghichu: e.target.value })}
          placeholder="ghi chu"
          className=" w-full shadow shadow-red-400"
        ></textarea>

        <div className="options flex items-center justify-center">
          <button
            onClick={handleCheck}
            className="w-full mt-4 px-2 py-1 bg-blue-600 text-white rounded"
          >
            Cham
          </button>
          <button
            onClick={handleOff}
            className="w-full mt-4 px-2 py-1 bg-red-600 text-white rounded"
          >
            Nghi
          </button>
        </div>
      </div>
    </div>
  );
};

const Edit = ({ date, onClose }: { date: string; onClose: () => void }) => {
  const { kieucas, kieungays } = useHomeStore();
  const { workShiftQuery, monthWorkQuery } = homeQuery();
  const { editCheckDate, cancelState } = useHomeApi();

  const [workInfo, setWorkInfo] = React.useState({
    ngay: date,
    giora: date + "T08:00",
    giovao: date + "T17:00",
    ca: 0,
    kieungay: 0,
    ghichu: "",
    id: 0,
  });

  React.useEffect(() => {
    if (!kieucas?.length || !kieungays?.length) return;

    setWorkInfo((prev) => ({
      ...prev,
      ca: kieucas[0].id,
      kieungay: kieungays[0].id,
    }));
  }, [kieucas, kieungays]);

  React.useEffect(() => {
    const selectedDate = monthWorkQuery.data?.find(
      (dayInfo) => dayInfo.ngay === date
    );
    if (!selectedDate) {
      onClose();
      toast.error("Chua co du lieu");
    }
    setWorkInfo((prev) => ({ ...prev, ...selectedDate }));
  }, [monthWorkQuery.data]);

  const handleEdit = async () => {
    try {
      if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");
      await editCheckDate({ ...workInfo, tuchamcong: workShiftQuery.data?.id });

      onClose();
      toast.success("Sua okela");
      monthWorkQuery.refetch();
    } catch (error) {
      toast.error("Looix oif");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelState({ machamcong: workInfo.id });
      monthWorkQuery.refetch();
      toast.success("Huy okela");
      onClose();
    } catch (error) {
      toast("ua ko xoa dc");
    }
  };

  return (
    <div className="px-2">
      <div className="bg-white rounded-lg">
        <div className="text-center text-xl font-medium">Cham bu</div>

        <div className="flex items-center justify-center gap-2">
          <p>Ca lam</p>
          <Select
            className="w-1/2"
            defaultValue={kieucas?.[0]?.id}
            value={workInfo.ca}
            onChange={(value) => setWorkInfo({ ...workInfo, ca: value })}
          >
            {kieucas &&
              kieucas.map((item, index) => {
                return (
                  <Option key={index} value={item.id} title={item.tenca} />
                );
              })}
          </Select>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <p>Kieu ngay</p>
          <Select
            className="w-1/2"
            defaultValue={kieungays?.[0]?.id}
            value={workInfo.kieungay}
            onChange={(value) => setWorkInfo({ ...workInfo, kieungay: value })}
          >
            {kieungays &&
              kieungays.map((item, index) => {
                return (
                  <Option
                    key={index}
                    value={item.id}
                    title={item.tenloaingay}
                  />
                );
              })}
          </Select>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 mt-2">
          <p>Gio den</p>
          <input
            type="datetime-local"
            className="w-1/2"
            value={workInfo?.giovao?.slice(0, 16) || getDate() + "T08:00"}
            onChange={(value) =>
              setWorkInfo({
                ...workInfo,
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
            value={workInfo?.giora?.slice(0, 16) || getDate() + "T17:00"}
            onChange={(value) =>
              setWorkInfo({
                ...workInfo,
                giora: value.target.value,
              })
            }
          />
        </div>

        <textarea
          value={workInfo.ghichu}
          onChange={(e) => setWorkInfo({ ...workInfo, ghichu: e.target.value })}
          placeholder="ghi chu"
          className=" w-full shadow shadow-red-400"
        ></textarea>

        <div className="options flex items-center justify-center">
          <button
            onClick={handleEdit}
            className="w-full mt-4 px-2 py-1 bg-blue-600 text-white rounded"
          >
            Sua cong
          </button>
          <button
            onClick={handleCancel}
            className="w-full mt-4 px-2 py-1 bg-red-600 text-white rounded"
          >
            Bo cham
          </button>
        </div>
      </div>
    </div>
  );
};

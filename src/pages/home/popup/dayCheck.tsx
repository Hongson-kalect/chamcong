import * as React from "react";
import homeQuery from "../_utils/_query";
import { getDate, getTimeDiff } from "@/lib/utils";
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
    giora: date + "T17:00",
    giovao: date + "T08:00",
    ca: 0,
    kieungay: 0,
    ghichu: "",
  });

  const handleCheck = async () => {
    try {
      if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");
      const heso = workShiftQuery.data?.hesos?.find(
        (item) =>
          item.kieuca === workInfo.ca && item.kieungay === workInfo.kieungay
      );
      let vesom = 0,
        tangca = 0,
        disom = 0,
        vaomuon = 0,
        giolam = 0;
      const di = getTimeDiff(heso?.batdau, workInfo.giovao.slice(11, 19));
      const ve = getTimeDiff(heso?.ketthuc, workInfo.giora.slice(11, 19));
      const lam = getTimeDiff(
        workInfo.giora.slice(11, 19),
        workInfo.giovao.slice(11, 19)
      );
      if (di > 0) disom = di;
      else vaomuon = -di;
      if (ve > 0) vesom = ve;
      else tangca = -ve;
      if (lam > 0) {
        giolam = Math.floor((lam * 100) / 60) / 100;
      } else {
        giolam = 24 + Math.floor((-lam * 100) / 60) / 100;
      }

      await checkDate({
        ...workInfo,
        tangca,
        vesom,
        vaomuon,
        disom,
        giolam,
        tuchamcong: workShiftQuery.data?.id,
      });

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
      toast.success("Ghi nghi thanh cong");
      monthWorkQuery.refetch();
    } catch (error) {
      toast.error("Looix oif");
    }
  };

  console.log("workInfo", workInfo);

  React.useEffect(() => {
    console.log("kieucas, kieungays", kieucas, kieungays);
    if (!kieucas?.length || !kieungays?.length) return;

    // if (!workInfo.ca) {
    //   setWorkInfo((prev) => ({ ...prev, ca: kieucas[0]?.id }));
    // }
    // if (!workInfo.kieungay) {
    //   setWorkInfo((prev) => ({ ...prev, kieungay: kieungays[0]?.id }));
    // }

    setWorkInfo((prev) => ({
      ...prev,
      ca: kieucas[0].id,
      kieungay: kieungays[0].id,
    }));
  }, [kieucas, kieungays]);

  return (
    <div className="px-2">
      <div className="bg-white rounded-lg">
        <div
          className="text-center text-xl py-1 font-medium"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          Cham bu
        </div>

        <div className="flex flex-col items-center gap-2 px-4 py-1">
          <div className="flex items-center w-full gap-2 py-1">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">Ca lam</p>
            </div>
            <Select
              className="w-1/2 h-10"
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
          <div className="flex items-center w-full gap-2 py-1">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">
                Kieu ngay
              </p>
            </div>
            <Select
              className="w-1/2 h-10"
              defaultValue={kieungays?.[0]?.id}
              value={workInfo.kieungay}
              onChange={(value) =>
                setWorkInfo({ ...workInfo, kieungay: value })
              }
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
          <div className="flex items-center w-full gap-2 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">Gio den</p>
            </div>
            <input
              type="datetime-local"
              className="flex-1 h-10 px-2 rounded-lg"
              style={{ border: "1px solid #aaa" }}
              value={workInfo?.giovao?.slice(0, 16) || getDate() + "T08:00"}
              onChange={(value) =>
                setWorkInfo({
                  ...workInfo,
                  giovao: value.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center w-full gap-2 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">Gio ve</p>
            </div>
            <input
              type="datetime-local"
              className="flex-1 h-10 px-2 rounded-lg"
              style={{ border: "1px solid #aaa" }}
              value={workInfo.giora.slice(0, 16) || getDate() + "T08:00"}
              onChange={(value) =>
                setWorkInfo({
                  ...workInfo,
                  giora: value.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center w-full gap-2 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">Ghi chu</p>
            </div>
            <input
              type="text"
              className="flex-1 h-10 px-2 rounded-lg"
              style={{ border: "1px solid #aaa" }}
              value={workInfo.ghichu}
              onChange={(e) =>
                setWorkInfo({ ...workInfo, ghichu: e.target.value })
              }
            />
          </div>
        </div>

        <div
          className="options flex items-center justify-center mt-4"
          style={{ borderTop: "1px solid #ccc" }}
        >
          <button
            onClick={handleCheck}
            className="w-full px-2 py-1 bg-blue-200 text-blue-700 font-medium h-12"
          >
            Cham
          </button>
          <button
            onClick={handleOff}
            className="w-full px-2 py-1 bg-red-200 text-red-700 font-medium h-12"
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

  const handleEdit = async () => {
    try {
      if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");

      const heso = workShiftQuery.data?.hesos?.find(
        (item) =>
          item.kieuca === workInfo.ca && item.kieungay === workInfo.kieungay
      );
      let vesom = 0,
        tangca = 0,
        disom = 0,
        vaomuon = 0,
        giolam = 0;
      const di = getTimeDiff(heso?.batdau, workInfo.giovao.slice(11, 19));
      const ve = getTimeDiff(heso?.ketthuc, workInfo.giora.slice(11, 19));
      const lam = getTimeDiff(
        workInfo.giora.slice(11, 19),
        workInfo.giovao.slice(11, 19)
      );
      if (di > 0) disom = di;
      else vaomuon = -di;
      if (ve > 0) vesom = ve;
      else tangca = -ve;
      if (lam > 0) {
        giolam = Math.floor((lam * 100) / 60) / 100;
      } else {
        giolam = 24 + Math.floor((lam * 100) / 60) / 100;
      }

      await editCheckDate({
        ...workInfo,
        tangca,
        vesom,
        vaomuon,
        disom,
        giolam,
        tuchamcong: workShiftQuery.data?.id,
      });

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

  return (
    <div className="px-2">
      <div className="bg-white rounded-lg">
        <div
          className="text-center text-xl py-1 font-medium"
          style={{ borderBottom: "1px solid #ddd" }}
        >
          Sua cong
        </div>

        <div className="flex flex-col items-center gap-2 px-4 py-1">
          <div className="flex items-center w-full gap-2 py-1">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">Ca lam</p>
            </div>
            <Select
              className="w-1/2 h-10"
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
          <div className="flex items-center w-full gap-2 py-1">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">
                Kieu ngay
              </p>
            </div>
            <Select
              className="w-1/2 h-10"
              defaultValue={kieungays?.[0]?.id}
              value={workInfo.kieungay}
              onChange={(value) =>
                setWorkInfo({ ...workInfo, kieungay: value })
              }
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
          <div className="flex items-center w-full gap-2 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">Gio den</p>
            </div>
            <input
              type="datetime-local"
              className="flex-1 h-10 px-2 rounded-lg"
              style={{ border: "1px solid #aaa" }}
              value={workInfo?.giovao?.slice(0, 16) || getDate() + "T08:00"}
              onChange={(value) =>
                setWorkInfo({
                  ...workInfo,
                  giovao: value.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center w-full gap-2 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">Gio ve</p>
            </div>
            <input
              type="datetime-local"
              className="flex-1 h-10 px-2 rounded-lg"
              style={{ border: "1px solid #aaa" }}
              value={workInfo.giora.slice(0, 16) || getDate() + "T08:00"}
              onChange={(value) =>
                setWorkInfo({
                  ...workInfo,
                  giora: value.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center w-full gap-2 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-500 w-20">Ghi chu</p>
            </div>
            <input
              type="text"
              className="flex-1 h-10 px-2 rounded-lg"
              style={{ border: "1px solid #aaa" }}
              value={workInfo.ghichu}
              onChange={(e) =>
                setWorkInfo({ ...workInfo, ghichu: e.target.value })
              }
            />
          </div>
        </div>

        <div
          className="options flex items-center justify-center mt-4"
          style={{ borderTop: "1px solid #ccc" }}
        >
          <button
            onClick={handleEdit}
            className="w-full px-2 py-1 bg-blue-200 text-blue-700 font-medium h-12"
          >
            Sua cong
          </button>
          <button
            onClick={handleCancel}
            className="w-full px-2 py-1 bg-red-200 text-red-700 font-medium h-12"
          >
            Bo cham
          </button>
        </div>
      </div>
    </div>
  );
};

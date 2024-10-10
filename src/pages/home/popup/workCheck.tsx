import * as React from "react";
import { WorkDateType } from "../_utils/_interface";
import homeQuery from "../_utils/_query";
import { useHomeStore } from "../_utils/_store";
import { DatePicker, Select } from "zmp-ui";
import { useHomeApi } from "../_utils/_api";
import { toast } from "react-toastify";
import { getDate, getTimeDiff } from "@/lib/utils";

export interface IWorkCheckProps {
  todayState?: "checked" | "dayOff" | "";
  todayInfo?: WorkDateType;
  onClose: () => void;
}

const { OtpGroup, Option } = Select;

export default function WorkCheck(props: IWorkCheckProps) {
  // const { setWorkState, workPage, setWorkPage } = useHomeStore();
  // const { checkDate } = useHomeApi();

  const { monthWorkQuery, workShiftQuery } = homeQuery();
  const { checkDate, editCheckDate, editOffDate } = useHomeApi();

  const [workInfo, setWorkInfo] = React.useState<WorkDateType>(() => {
    if (props.todayInfo) return JSON.parse(JSON.stringify(props.todayInfo));
    else return {};
  });

  console.log("workInfo :>> ", workInfo);
  console.log("workShiftQuery :>> ", workShiftQuery);

  const todayState = React.useMemo(() => {}, [props.todayInfo]);

  const { kieucas, kieungays } = useHomeStore();

  const handleEditInfo = () => {
    console.log("edited");
  };

  const handleCheckAction = async () => {
    console.log(workInfo, workShiftQuery.data?.id);
    if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");

    if (props.todayInfo?.dilam === true) {
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

      await editCheckDate({
        ...workInfo,
        tangca,
        vesom,
        vaomuon,
        disom,
        giolam,
        tuchamcong: workShiftQuery.data?.id,
      });
    } else if (props.todayInfo?.dilam === false) {
      await editOffDate({
        kieungay: workInfo.kieunghi,
        ngay: workInfo.ngaycham,
        tuchamcong: workShiftQuery.data?.id,
      });
    } else
      await checkDate({ ...workInfo, tuchamcong: workShiftQuery.data?.id });

    props.onClose();
  };

  React.useEffect(() => {
    //gan gio mac dinh ,cac thu fua vao ca
    console.log("work", workInfo);
    if (!kieucas?.length || !kieungays?.length) return;

    if (!workInfo.ca) {
      setWorkInfo((prev) => ({ ...prev, ca: kieucas[0]?.id }));
    }
    if (!workInfo.kieungay) {
      setWorkInfo((prev) => ({ ...prev, kieungay: kieungays[0]?.id }));
    }
    if (!workInfo.ngay) {
      setWorkInfo((prev) => ({ ...prev, ngay: getDate() }));
    }
    if (!workInfo.giovao) {
      setWorkInfo((prev) => ({ ...prev, giovao: getDate() + "T08:00" }));
    }
    if (!workInfo.giora) {
      setWorkInfo((prev) => ({ ...prev, giora: getDate() + "T17:00" }));
    }
  }, [kieucas, kieungays]);

  console.log("kieucas, kieungays :>> ", kieucas, kieungays);

  return (
    <div className="px-4">
      <div className="bg-white rounded-lg p-2">
        {props.todayInfo?.dilam === true ? (
          <UpdateCheck
            kieucas={kieucas}
            kieungays={kieungays}
            workInfo={workInfo}
            setWorkInfo={setWorkInfo}
          />
        ) : props.todayInfo?.dilam === false ? (
          <UpdateOff
            cas={kieucas}
            kieungays={kieungays}
            workInfo={workInfo}
            setWorkInfo={setWorkInfo}
          />
        ) : (
          <Check
            kieucas={kieucas}
            kieungays={kieungays}
            workInfo={workInfo}
            setWorkInfo={setWorkInfo}
          />
        )}

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

const Check = ({ kieucas, workInfo, setWorkInfo, kieungays }) => {
  return (
    <div>
      <div>
        <div className="text-center text-xl font-medium">Cham cong</div>

        <div className="flex items-center justify-center gap-2">
          <p>Ca lam</p>
          <Select
            className="w-1/2"
            defaultValue={kieucas?.[0]?.id}
            value={workInfo.kieuca}
            onChange={(value) => setWorkInfo({ ...workInfo, ca: value })}
          >
            {kieucas.map((item, index) => {
              return <Option key={index} value={item.id} title={item.tenca} />;
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
            {kieungays.map((item, index) => {
              return (
                <Option key={index} value={item.id} title={item.tenloaingay} />
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
      </div>
    </div>
  );
};
const UpdateCheck = ({ kieucas, workInfo, setWorkInfo, kieungays }) => {
  return (
    <div>
      <div
        className="text-center text-xl py-1 font-medium"
        style={{ borderBottom: "1px solid #ddd" }}
      >
        Sua cong
      </div>
      <div className="flex flex-col items-center gap-2 px-2 py-1">
        <div className="flex items-center w-full gap-2 py-1">
          <div>
            <p className="text-sm font-medium text-gray-500 w-20">Ca lam</p>
          </div>
          <Select
            className="w-1/2 h-10"
            defaultValue={kieucas?.[0]?.id}
            value={workInfo.kieuca}
            onChange={(value) => setWorkInfo({ ...workInfo, ca: value })}
          >
            {kieucas.map((item, index) => {
              return <Option key={index} value={item.id} title={item.tenca} />;
            })}
          </Select>
        </div>
        <div className="flex items-center w-full gap-2">
          <div>
            <p className="text-sm font-medium text-gray-500 w-20">Kieu ngay</p>
          </div>
          <Select
            className="w-1/2 h-10"
            defaultValue={kieungays?.[0]?.id}
            value={workInfo.kieungay}
            onChange={(value) => setWorkInfo({ ...workInfo, kieungay: value })}
          >
            {kieungays.map((item, index) => {
              return (
                <Option key={index} value={item.id} title={item.tenloaingay} />
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
            value={workInfo.giovao.slice(0, 16) || getDate() + "T08:00"}
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
    </div>
  );
};
const UpdateOff = ({ cas, workInfo, setWorkInfo, kieungays }) => {
  return (
    <div>
      <div className="text-center text-xl font-medium">Nay nghi</div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p>Kieu nghi</p>
        <Select
          className="w-1/2"
          defaultValue={kieungays?.[0]?.id}
          value={workInfo.kieungay}
          onChange={(value) => setWorkInfo({ ...workInfo, kieungay: value })}
        >
          {kieungays.map((item, index) => {
            return (
              <Option key={index} value={item.id} title={item.kieungays} />
            );
          })}
        </Select>
      </div>
      {/* <div className="flex flex-1 items-center justify-center gap-2 mt-2">
              <p>Ngay</p>
              <input
                type="date"
                className="w-1/2"
                value={workInfo.giovao}
                onChange={(value) =>
                  setWorkInfo({
                    ...workInfo,
                    giovao: value.target.value,
                  })
                }
              />
            </div> */}

      <textarea
        value={workInfo.ghichu}
        onChange={(e) => setWorkInfo({ ...workInfo, ghichu: e.target.value })}
        placeholder="ghi chu"
        className=" w-full shadow shadow-red-400"
      />
    </div>
  );
};

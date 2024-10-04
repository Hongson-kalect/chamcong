import * as React from "react";
import { WorkDateType } from "../_utils/_interface";
import homeQuery from "../_utils/_query";
import { useHomeStore } from "../_utils/_store";
import { DatePicker, Select } from "zmp-ui";
import { useHomeApi } from "../_utils/_api";
import { toast } from "react-toastify";

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
    if (props.todayState === "") {
      if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");
      if (!workInfo.ca || !workInfo.kieungay)
        return toast.error("Hay chon kieu ca va kieu ngay");
      await checkDate({ ...workInfo, tuchamcong: workShiftQuery.data?.id });
    } else if (props.todayState === "checked") {
      if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");
      if (!workInfo.ca || !workInfo.kieungay)
        return toast.error("Hay chon kieu ca va kieu ngay");
      await editCheckDate({ ...workInfo, tuchamcong: workShiftQuery.data?.id });
    } else if (props.todayState === "dayOff") {
      if (!workShiftQuery.data?.id) return toast.error("Chua co bang cong nao");
      if (!workInfo.ca || !workInfo.kieungay)
        return toast.error("Hay chon kieu ca va kieu ngay");
      await editOffDate({
        kieunghi: workInfo.kieunghi,
        ngaycham: workInfo.ngaycham,
        tuchamcong: workShiftQuery.data?.id,
      });
    }

    props.onClose();
  };

  console.log("kieucas, kieungays :>> ", kieucas, kieungays);

  return (
    <div className="px-4">
      <div className="bg-white rounded-lg p-2">
        {props.todayState === "" ? (
          <Check
            kieucas={kieucas}
            kieungays={kieungays}
            workInfo={workInfo}
            setWorkInfo={setWorkInfo}
          />
        ) : props.todayState === "checked" ? (
          <UpdateCheck
            kieucas={kieucas}
            kieungays={kieungays}
            workInfo={workInfo}
            setWorkInfo={setWorkInfo}
          />
        ) : props.todayState === "dayOff" ? (
          <UpdateOff
            cas={kieucas}
            kieungays={kieungays}
            workInfo={workInfo}
            setWorkInfo={setWorkInfo}
          />
        ) : null}

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
            value={workInfo.kieuca}
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
            value={workInfo?.giovao?.slice(0, 16)}
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
            value={workInfo?.giora?.slice(0, 16) || wo}
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
      <div className="text-center text-xl font-medium">Sua cong</div>

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
          value={workInfo.kieuca}
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
          value={workInfo.giovao.slice(0, 16)}
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
          value={workInfo.giora.slice(0, 16)}
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
  );
};
const UpdateOff = ({ cas, workInfo, setWorkInfo, kieungays }) => {
  return (
    <div>
      <div className="text-center text-xl font-medium">Nay nghi</div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p>Kieu ngay</p>
        <Select
          className="w-1/2"
          defaultValue={kieungays?.[0]?.id}
          value={workInfo.kieuca}
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

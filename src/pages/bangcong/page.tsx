import UserHeader from "@/components/userheader";
import SideBar from "@/layout/sidebar";
import { PlusCircle } from "lucide-react";
import * as React from "react";
import { toast } from "react-toastify";
import { IHeSo, IKieuNgay, WorkPageType } from "../home/_utils/_interface";
import homeQuery from "../home/_utils/_query";
import { WorkShiftType } from "../taobangcong/_utils/_interface";
import { PopupWrapper } from "../taobangcong/popup/workShiftDetail";

export interface ITrangBangCongProps {}

export default function TrangBangCong(props: ITrangBangCongProps) {
  const [tab, setTab] = React.useState<"ngay" | "luong">("ngay");
  const { workShiftQuery } = homeQuery();
  const [workShift, setWorkShift] = React.useState<WorkPageType>(
    JSON.parse(JSON.stringify(workShiftQuery?.data || {}))
  );

  React.useEffect(() => {
    if (!workShiftQuery.data) return;
    const oldWorkShift = JSON.parse(JSON.stringify(workShiftQuery.data));
    setWorkShift((prev) => ({ ...prev, ...oldWorkShift }));
  }, [workShiftQuery.data]);

  console.log("workShiftQuery :>> ", workShiftQuery.data);

  return (
    <div className="h-full flex flex-col">
      <SideBar />
      <div className="bg-blue-800">
        <UserHeader />
      </div>

      <div className="p-2">
        <input
          value={workShift?.tencongty}
          spellCheck={false}
          className=" bg-transparent  focus:shadow focus:shadow-gray-600 rounded-t-lg outline-none text-xl font-medium px-2 py-0.5"
          placeholder="Ten cong ty"
          onChange={(event) =>
            setWorkShift({ ...workShift, tencongty: event.target.value })
          }
        />
        <div className="flex items-center italic text-[10px] font-light gap-2">
          <p>Ngay vao</p>
          <div>{workShift?.ngaybatdau}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <p>Bo phan</p>
            <input
              type="text"
              className="flex-1 w-20 px-1 py-0.5"
              spellCheck={false}
              value={workShift.bophan}
              onChange={(event) =>
                setWorkShift({ ...workShift, bophan: event.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>Chuc vu</p>
            <input
              type="text"
              className="flex-1 w-20"
              value={workShift.chucvu}
              onChange={(event) =>
                setWorkShift({ ...workShift, chucvu: event.target.value })
              }
            />
            {/* <div>{workShift?.chucvu}</div> */}
          </div>
        </div>
      </div>
      <div className="flex items-center relative bg-gray-400">
        <div
          className={`${
            tab === "ngay" ? "" : "translate-x-[100%]"
          } absolute h-full w-1/2 top-0 left-0 bg-black duration-200 ease-linear`}
        ></div>
        <div className="w-full flex items-center relative">
          <div
            onClick={() => setTab("ngay")}
            className={`flex flex-1 h-12 items-center justify-center ${
              tab === "ngay" ? " text-white" : ""
            }`}
          >
            Kieu ngay
          </div>
          <div
            onClick={() => setTab("luong")}
            className={`flex flex-1 h-12 items-center justify-center ${
              tab === "luong" ? " text-white" : ""
            }`}
          >
            Luong
          </div>
        </div>

        {/* </div> */}
      </div>
      {tab === "ngay" ? <KieuNgay workShift={workShift} /> : <Luong />}
    </div>
  );
}

type WorkShiftType = {};

const KieuNgay = (props: { workShift: WorkPageType }) => {
  // const { workShiftQuery } = homeQuery();
  const [workShift, setWorkShit] = React.useState(
    JSON.parse(JSON.stringify(props.workShift))
  );

  console.log("workShift?.kieungays :>> ", workShift?.kieungays);

  const addKieuNgay = () => {
    try {
      // Goi api them ngay
      // const res = apiPost
      const res = {
        data: {
          id: Math.floor(Math.random() * 10000000),
          tenloaingay: "Ngay moi",
          ghichu: "string",
          ngaycuthe: null,
          ngaytrongtuan: "[1,2,3,4,5,6]",
          cochuyencan: false,
        },
      };

      workShift.kieungays.push(res.data);
      setWorkShit({ ...workShift });
    } catch (error) {
      toast.error("Ko them đc ngay mới");
    }
  };

  React.useEffect(() => {
    setWorkShit({
      ...workShift,
      ...props.workShift,
    });
  }, [props.workShift]);

  if (!workShift?.kieungays?.length)
    return <div>Chưa có kiểu ngày. Tạo 1 cái ê</div>;

  return (
    <div>
      {" "}
      <div>
        {workShift?.kieungays.map((item, index) => {
          return (
            <DaySetting
              key={index}
              kieungay={item}
              workShift={workShift}
              onClose={() => alert("close " + item.id)}
            />
          );
        })}

        <div className="flex items-center justify-center w-full">
          <PlusCircle size={24} className="mt-2" onClick={addKieuNgay} />
        </div>
      </div>
    </div>
  );
};

const Luong = (params) => {
  return <div>Luong setting</div>;
};

const DaySetting = ({
  kieungay,
  workShift,
  onClose,
}: {
  kieungay: IKieuNgay;
  workShift: WorkPageType;
  onClose: () => void;
}) => {
  const [dayDetail, setDayDetail] = React.useState(false);
  const [createRate, setCreateRate] = React.useState<number | null>(null);
  return (
    // <PopupWrapper onClose={() => alert("dong setting")}>
    <>
      <div>
        <div className="bg-blue-200">
          <div>
            <div className="flex items-center px-2 py-1 justify-between">
              {kieungay?.tenloaingay}
              <p onClick={() => setDayDetail(true)}>setting</p>
            </div>
          </div>
          <div className="flex items-center px-2 py-1 justify-between">
            <div>{kieungay?.ngaytrongtuan}</div>
            <div>{kieungay?.ghichu}</div>
          </div>
        </div>
        <div className="bg-pink-200">
          {workShift?.hesos?.length &&
            workShift.hesos.map((item, index) => {
              if (item.kieungay !== kieungay.id) return;
              return (
                <div>
                  Hê số {item.kieungay} - {item.kieuca}
                </div>
              );
            })}
        </div>
        <div onClick={() => setCreateRate(kieungay.id)}>
          {"+) Thêm kiểu ngày"}
        </div>
      </div>
      {dayDetail ? (
        <PopupWrapper onClose={() => setDayDetail(false)}>
          <div className="bg-white">
            <div>
              <p>Ú a ú ớ</p>
            </div>
            <div className="">
              <button
                className="bg-red-500 px-4 py-1 text-white"
                onClick={() => alert("remove day " + kieungay?.id)}
              >
                Xóa bỏ
              </button>
            </div>
          </div>
        </PopupWrapper>
      ) : null}
      {createRate ? (
        <PopupWrapper onClose={() => setCreateRate(null)}>
          <CreateRate kieungay={kieungay.id} />
        </PopupWrapper>
      ) : null}
    </>

    // </PopupWrapper>
  );
};

const CreateRate = (props: { heso?: IHeSo; kieungay: number }) => {
  //ko có props.heso thì là thêm, có thì là sửa
  return (
    <div className="bg-white">
      <div>
        <p>Thêm hệ số cho bảng {props.kieungay}</p>
      </div>
      <div className="">
        <button
          className="bg-red-500 px-4 py-1 text-white"
          onClick={() => alert("remove day " + props.kieungay)}
        >
          Xóa hệ số
        </button>
      </div>
    </div>
  );
};

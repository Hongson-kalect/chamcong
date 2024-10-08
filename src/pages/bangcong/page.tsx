import UserHeader from "@/components/userheader";
import SideBar from "@/layout/sidebar";
import { PlusCircle } from "lucide-react";
import * as React from "react";
import { toast } from "react-toastify";
import {
  IHeSo,
  IKieuCa,
  IKieuNgay,
  WorkPageType,
} from "../home/_utils/_interface";
import homeQuery from "../home/_utils/_query";
import { WorkShiftType } from "../taobangcong/_utils/_interface";
import { PopupWrapper } from "../taobangcong/popup/workShiftDetail";
import { RiEdit2Fill } from "react-icons/ri";
import { PlusIcon } from "@radix-ui/react-icons";
import { FaCaretDown, FaChevronLeft } from "react-icons/fa6";
import HesoLuong from "./popup/hesoluong";
import Kieuca from "./popup/kieuca";
import Kieungay from "./popup/kieungay";
import { useNavigate } from "zmp-ui";

export interface ITrangBangCongProps {}

export default function TrangBangCong(props: ITrangBangCongProps) {
  const navigate = useNavigate();

  const [tab, setTab] = React.useState<"ngay" | "luong">("ngay");
  const { workShiftQuery } = homeQuery();
  const [kieungayPopup, setKieungayPopup] = React.useState(false);
  const [hesoPopup, setHesoPopup] = React.useState(false);
  const [kieucaPopup, setKieucaPopup] = React.useState(false);
  const [workShift, setWorkShift] = React.useState<WorkPageType>(
    JSON.parse(JSON.stringify(workShiftQuery?.data || {}))
  );

  const [selectedKieungay, setSelectedKieungay] =
    React.useState<IKieuNgay | null>(null);
  const [selectedHeso, setSelectedHeso] = React.useState<IHeSo | null>(null);
  const [selectedKieuca, setSelectedKieuca] = React.useState<IKieuCa | null>(
    null
  );

  const onSelectKieungay = (kieungay: IKieuNgay | null) => {
    if (kieungay) setSelectedKieungay({ ...kieungay });
    else setSelectedKieungay(null);
    setKieungayPopup(true);
  };

  const onSelectHeso = (heso: IHeSo | null, ca: IKieuCa, ngay: IKieuNgay) => {
    setSelectedKieuca({ ...ca });
    setSelectedKieungay({ ...ngay });
    if (heso) {
      setSelectedHeso({ ...heso });
    } else setSelectedHeso(null);
    setHesoPopup(true);
  };
  const onSelectKieuca = (kieuca: IKieuCa | null) => {
    if (kieuca) setSelectedKieuca({ ...kieuca });
    else setSelectedKieuca(null);
    setKieucaPopup(true);
  };

  React.useEffect(() => {
    if (!workShiftQuery.data) return;
    const oldWorkShift = JSON.parse(JSON.stringify(workShiftQuery.data));
    setWorkShift((prev) => ({ ...prev, ...oldWorkShift }));
  }, [workShiftQuery.data]);

  console.log("workShiftQuery :>> ", workShiftQuery.data);

  return (
    <>
      <div className="h-full flex flex-col bg-white">
        <div className=" font-medium bg-blue-950 w-screen flex items-center gap-10 text-white p-2 px-4">
          <FaChevronLeft onClick={() => navigate("/")} className="text-2xl" />
          <p onClick={() => navigate("/")} className="text-xl">
            Kiểu ngày
          </p>
        </div>
        <div className="bg-white flex-1">
          <div className="flex items-center justify-between px-4 my-4">
            <div className="text-2xl font-medium text-blue-950 pb-1">
              {/* Tần suất */}
            </div>
            <button
              className="flex items-center justify-center gap-2 px-4 rounded-lg py-2 bg-blue-900 text-white"
              onClick={() => onSelectKieuca(null)}
            >
              <PlusIcon /> <p>Ca làm việc</p>
            </button>
          </div>
          <div className="px-6 pb-4">
            <div className="px-6 mb-4">
              <div className="rounded-lg bg-blue-900 p-2">
                <div className="p-2 bg-white h-28 shadow-inner shadow-black">
                  Biểu đồ cột kiểu ngày đã làm 5 tháng gần nhất
                </div>
                <div className="mt-3 mb-1 text-gray-300 font-medium">Tổng</div>
                <div className="text-white pl-2">
                  <div className="h-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <p className="text-lg text-gray-400">Ngày thường</p>
                    </div>
                    <p className="text-2xl">240</p>
                  </div>
                  <div className="h-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                      <p className="text-lg text-gray-400">Ngày nghỉ</p>
                    </div>
                    <p className="text-2xl">12</p>
                  </div>
                  <div className="h-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-600"></div>
                      <p className="text-lg text-gray-400">Ngày lễ</p>
                    </div>
                    <p className="text-2xl">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {workShift.kieungays?.length &&
            workShift.kieungays?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-4 text-blue-950 mt-4"
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <div
                    className="flex items-center gap-3"
                    onClick={() => onSelectKieungay(item)}
                  >
                    <div className="w-9 h-9 bg-blue-800 rounded-lg" />
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-medium">{item.tenloaingay}</p>
                      <FaCaretDown size={24} />
                    </div>
                  </div>
                  <div className="pl-10 py-5 flex flex-col gap-3">
                    {workShift.kieucas?.length &&
                      workShift.kieucas?.map((ca, caIndex) => {
                        const heso =
                          workShift.hesos.find((heso) => {
                            return (
                              heso.kieungay === item.id && heso.kieuca === ca.id
                            );
                          }) || null;

                        return (
                          <div
                            key={caIndex}
                            className="flex items-center justify-between"
                            onClick={() => onSelectHeso(heso, ca, item)}
                          >
                            <div className="text-gray-700 px-2 gap-1 flex flex-col">
                              <p
                                className="font-medium text-lg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectKieuca(ca);
                                }}
                              >
                                {ca.tenca}
                              </p>
                              <p className="font-light text-[9px] text-gray-500">
                                Thoi gian{" "}
                                <span className="text-xs text-blue-600">
                                  {heso?.batdau || "Kho ro"}
                                </span>{" "}
                                -{" "}
                                <span className="text-xs text-blue-600">
                                  {heso?.ketthuc || " Khong ro"}
                                </span>
                              </p>
                            </div>
                            <p className="text-lg font-medium">
                              <span className="text-gray-500">HS -</span>{" "}
                              {heso?.heso}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className="mt-4 flex flex-col gap-2 items-center text-gray-400"
          onClick={() => onSelectKieungay(null)}
        >
          <PlusCircle size={20} />

          <div>Theem kieu ngay</div>
        </div>
        <div className="h-4"></div>
      </div>

      {/* Popup */}

      {hesoPopup && (
        <PopupWrapper
          onClose={() => {
            setHesoPopup(false);
            // workShiftQuery.refetch();
          }}
        >
          <HesoLuong
            kieuca={selectedKieuca?.id || 0}
            kieungay={selectedKieungay?.id || 0}
            heso={selectedHeso}
            onClose={() => setHesoPopup(false)}
          />
        </PopupWrapper>
      )}
      {kieucaPopup && (
        <PopupWrapper
          onClose={() => {
            setKieucaPopup(false);
            // workShiftQuery.refetch();
          }}
        >
          <Kieuca
            kieuca={selectedKieuca}
            onClose={() => setKieucaPopup(false)}
          />
        </PopupWrapper>
      )}
      {kieungayPopup && (
        <PopupWrapper
          onClose={() => {
            setKieungayPopup(false);
            // workShiftQuery.refetch();
          }}
        >
          <Kieungay
            kieungay={selectedKieungay}
            onClose={() => setKieungayPopup(false)}
          />
        </PopupWrapper>
      )}
    </>
  );
}

type WorkShiftType = {};

const ICaigi = (props: { workShift: WorkPageType }) => {
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

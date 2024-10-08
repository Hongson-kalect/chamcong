import * as React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "zmp-ui";
import homeQuery from "../home/_utils/_query";
import { Input } from "antd";

export interface ITrangCongTyProps {}

export default function TrangCongTy(props: ITrangCongTyProps) {
  const navigate = useNavigate();

  const { workShiftQuery } = homeQuery();

  console.log("workShiftQuery", workShiftQuery);
  return (
    <div className="h-full flex flex-col bg-white text-base">
      <div className=" font-medium bg-blue-950 w-screen flex items-center gap-10 text-white p-2 px-4">
        <FaChevronLeft onClick={() => navigate("/")} className="text-2xl" />
        <p onClick={() => navigate("/")} className="text-xl">
          Coong ty
        </p>
      </div>
      <div className="p-2 px-4 flex flex-col gap-3">
        <div>
          {/* <p>Tên công ty</p> */}
          <Input
            className="text-center outline-none border-none text-3xl shadow-none"
            value={"Assa abloy"}
          />
        </div>
        <div>
          <p className="text-gray-400">Bộ phận</p>
          <Input
            value={"Ai ty"}
            size="large"
            className="font-medium text-lg text-gray-700"
          />
        </div>
        <div>
          <p className="text-gray-400">Ngay chot cong</p>
          <Input
            value={"Ai ty"}
            size="large"
            className="font-medium text-lg text-gray-700"
          />
        </div>
        <div>
          <p className="text-gray-400">Ngay bat dau</p>
          <Input
            value={"Ai ty"}
            size="large"
            className="font-medium text-lg text-gray-700"
          />
        </div>
        <div>
          <p className="text-gray-400">Danh gia vi tri cua ban</p>
          <Input
            value={"Ai ty"}
            size="large"
            className="font-medium text-lg text-gray-700"
          />
        </div>
        <div>
          <p className="text-gray-400">Danh gia toan tong ty</p>
          <Input
            value={"Ai ty"}
            size="large"
            className="font-medium text-lg text-gray-700"
          />
        </div>
      </div>
    </div>
  );
}

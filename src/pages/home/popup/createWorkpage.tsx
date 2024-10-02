import { Input } from "antd";
import * as React from "react";
import { useHomeApi } from "../_utils/_api";
import { WorkPageType } from "../_utils/_interface";

export interface ICreateWorkPageProps {
  sendData: (workpage: WorkPageType) => void;
}

export default function CreateWorkPage(props: ICreateWorkPageProps) {
  const { createWorkShift } = useHomeApi();
  const [name, setName] = React.useState("");
  const [position, setPosition] = React.useState("");
  const createBasicWorkPage = async () => {
    const data = await createWorkShift({ tencongty: name, chucvu: position });
    props.sendData(data);
  };

  return (
    <div className="px-2">
      <div className="bg-white rounded-lg">
        <div className="w-full h-full flex flex-col items-center p-8 gap-8 ">
          <div className="font-medium text-[28px] text-gray-950">
            Tao bang cong moi
          </div>
          <div className="image flex-1 w-full">
            <div className="w-full h-full bg-blue-400"></div>
          </div>
          <div>
            <p className="text-center text-sm">Co ve khong co bang cong nao</p>
            <p className="text-center">Hay tao ngay 1 bang cong moi</p>
          </div>
          <form className="form w-full">
            <div>
              <p className="font-medium text-gray-500">Ten cong ty</p>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mt-2">
              <p className="font-medium text-gray-500">Chuc vu</p>
              <Input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
          </form>
          <div className="flex gap-4 w-full h-14 justify-center items-center">
            <div
              className="button rounded-lg text-lg flex-1 flex items-center justify-center py-1.5 bg-blue-600 text-white font-medium"
              style={{ border: "1px solid #888" }}
              onClick={createBasicWorkPage}
            >
              Tao bang cong moi
            </div>
            {/* <div
            onClick={createWorkPage}
            className="button rounded-lg text-white text-lg font-medium flex-1 bg-blue-600 flex items-center justify-center"
          >
            Tu tao moi
          </div> */}
          </div>
          <p className="text-center text-gray-500">
            Dung lo! Ban luon co the tu do sua thong tin bang cong cua minh
          </p>
        </div>
      </div>
    </div>
  );
}

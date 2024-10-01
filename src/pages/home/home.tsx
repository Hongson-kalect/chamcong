import { removeCache } from "@/store/native.store";
import * as React from "react";
import { Button, useNavigate } from "zmp-ui";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const [userWorkPage, setWorkPage] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {}, []);

  const createBasicWorkPage = async () => {
    alert("createBasicWorkPage");
  };
  const createWorkPage = async () => {
    navigate("/create-work-page");
  };

  if (userWorkPage.length == 0)
    return (
      <div className="w-full h-full flex flex-col items-center p-8 gap-8">
        <div className="font-medium text-[28px] text-gray-950">
          Tao bang cong moi
        </div>
        <div className="image flex-1 w-full">
          <div className="w-full h-full bg-blue-400"></div>
        </div>
        <p>
          Co ve day la lan dau tien su dung ung dung cua ban. Hay to 1 bang cong
          moi hoac su duing bang luong mac dinh
        </p>
        <div className="flex gap-4 w-full h-14">
          <div
            className="button rounded-lg text-lg font-light flex-1 text-[#555] flex items-center justify-center"
            style={{ border: "1px solid #888" }}
            onClick={createBasicWorkPage}
          >
            Mac dinh
          </div>
          <div
            onClick={createWorkPage}
            className="button rounded-lg text-white text-lg font-medium flex-1 bg-blue-600 flex items-center justify-center"
          >
            Tu tao moi
          </div>
        </div>
        <p className="text-center text-gray-500">
          Dung lo! Ban luon co the tu do sua thong tin bang cong cua minh
        </p>
      </div>
    );
  return (
    <div>
      Trang home nè
      <Button onClick={() => alert("adsad")}>ádsad</Button>
    </div>
  );
}

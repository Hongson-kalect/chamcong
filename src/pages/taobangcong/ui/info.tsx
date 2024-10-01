import * as React from "react";

export interface IStartTabInfoProps {
  tab: number;
}

const info = {
  0: {
    title: "Chấm công một chạm",
    detail:
      "Kiểm soát thời gian làm việc của bạn nhanh chóng và dễ dàng, ghi lại ngày công đơn giản, chính xác",
  },
  1: {
    title: "Ước tính tiền lương",
    detail:
      "Giúp bạn có được mức lương dự kiến với các thuật toán chi tiết, dễ dàng đối chiếu, so sánh",
  },
  2: {
    title: "Liên kết công ty",
    detail:
      "Liên kết với các công ty trong chuỗi, có thể gửi các yêu cầu trực tuyến (báo nghỉ, chấm công, sai số,...)",
  },
};

export default function StartTabInfo(props: IStartTabInfoProps) {
  return (
    <div className="w-full">
      <div className="title font-semibold text-[26px] text-center text-gray-950">
        {info[props.tab].title}
      </div>
      <div className="detail mt-5 h-20 text-sm text-gray-700">
        {info[props.tab].detail}
      </div>
    </div>
  );
}

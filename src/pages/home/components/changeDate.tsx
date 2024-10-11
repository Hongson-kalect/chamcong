import { DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { RiEdit2Line } from "react-icons/ri";
import styled from "styled-components";
import { GrPowerCycle } from "react-icons/gr";
import { FaAnglesLeft, FaAnglesRight, FaPen } from "react-icons/fa6";

export interface IChangeDateProps {
  isYear: boolean;
  setIsYear: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangeDate({ isYear, setIsYear }: IChangeDateProps) {
  const [wageType, setWageType] = React.useState<"month" | "year">("month");
  // const [isYear, setIsYear] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  return (
    <div>
      <TimeTypeChanger isYear={isYear} onChange={() => setIsYear(!isYear)} />
      <TimeSelect
        date={date}
        isYear={isYear}
        onChange={(date: Date) => setDate(date)}
      />
    </div>
  );
}

const TimeTypeChanger = ({
  isYear,
  onChange,
}: {
  isYear: boolean;
  onChange: () => void;
}) => {
  const onTypeChange = () => {
    // xu ly animation

    onChange();
  };
  return (
    <div className="relative flex justify-end" onClick={onTypeChange}>
      {/* <div className="h-12 w-24 rounded-full bg-blue-900"></div> */}
      <div className="line-[10px] w-20 rounded-[50%] bg-blue-900 px-4 py-2 text-center text-white">
        {/* <p style={{ animation: "fadeInScale 0.3s ease-out" }}> */}
        {isYear ? (
          <p style={{ animation: "topFloatIn 0.2s ease-out" }}>Năm</p>
        ) : (
          <div style={{ animation: "topFloatIn 0.2s ease-out" }}>Tháng</div>
        )}
        {/* </p> */}
      </div>
      <div className="icon absolute -top-2 right-[75px]">
        <GrPowerCycle className="text-blue-900" />
      </div>

      {isYear ? (
        <p
          className="icon absolute -top-1 right-24 text-gray-300"
          style={{ animation: "rightFloatIn 0.2s ease-out" }}
        >
          Tháng
        </p>
      ) : (
        <div
          className="icon absolute -top-1 right-24 text-gray-300"
          style={{ animation: "rightFloatIn 0.2s ease-out" }}
        >
          Năm
        </div>
      )}
      {/* <p className="icon absolute -top-1 right-24 -rotate-12 text-gray-300">
        {isYear ? "Tháng" : "Năm"}
      </p> */}
    </div>
  );
};

const TimeSelect = ({
  date,
  // setDate
  isYear,
  onChange,
}: {
  date: Date;
  isYear: boolean;
  onChange: (val: Date) => void;
}) => {
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const dateChange = (val: Date) => {
    onChange(val);
    setOpenDatePicker(false);
  };
  return (
    <>
      <div
        className="relative h-20 pt-2 text-blue-900"
        onClick={() => setOpenDatePicker(true)}
      >
        {isYear ? (
          <div
            style={{ animation: "topFloatIn 0.2s ease-out" }}
            className="pt-4 text-4xl"
          >
            {date.getFullYear()}
          </div>
        ) : (
          <>
            <p
              style={{ animation: "bottomFloatIn 0.2s ease-out" }}
              className="float-end pr-12 text-5xl"
            >
              {date.getMonth() + 1}
            </p>
            <div className="icon absolute -left-6 top-0">
              <FaPen className="flip scale-x-[-1]" />
            </div>

            <p className="absolute bottom-2 right-10 text-xl">/</p>
            <p className="text-right text-gray-300">{date.getFullYear()}</p>
          </>
        )}
      </div>
      <div className="fixed right-5 top-20 h-0">
        {/* <StyledDatePicker
          className="over h-0 overflow-hidden"
          ref={datePicker}
          picker={isYear ? "year" : "month"}
          inputReadOnly
          onChange={(val) => dateChange(val)}
          open={openDatePicker}
        /> */}
      </div>
      {openDatePicker ? (
        <DateSelecter
          isYear={isYear}
          date={date}
          onChange={(date?: Date) =>
            date ? dateChange(date) : setOpenDatePicker(false)
          }
        />
      ) : null}
    </>
  );
};

const monthVal = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "July",
  "June",
  "Autumn",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DateSelecter = ({
  isYear,
  date,
  onChange,
}: {
  isYear: boolean;
  date: Date;
  onChange: (date?: Date) => void;
}) => {
  const [month, setMonth] = React.useState(
    date?.getMonth() || new Date().getMonth()
  );
  const [year, setYear] = React.useState(
    date?.getFullYear() || new Date().getFullYear()
  );

  const [yearRange, setYearRange] = React.useState(() => {
    return (
      Math.floor(date?.getFullYear() / 10) * 10 ||
      Math.floor(new Date().getFullYear() / 10) * 10
    );
  });

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        className="overlay h-full w-full bg-[#00000088]"
        onClick={() => onChange()}
      ></div>
      <div
        className="absolute left-[5vw] right-[5vw] top-[10vh] z-10 rounded-lg border-gray-500 bg-white p-2"
        style={{ animation: "fadeInScale 0.3s ease-out" }}
      >
        {isYear ? (
          <>
            <div
              className="year flex items-center justify-center gap-6"
              style={{ borderBottom: "1px solid #f2f2f2" }}
            >
              <FaAnglesLeft
                className="text-gray-500"
                onClick={() => setYearRange((prev) => prev - 10)}
              />
              <div className="w-28 border-none bg-transparent text-center font-medium outline-none">
                {yearRange} - {yearRange + 12}
              </div>
              <FaAnglesRight
                className="text-gray-500"
                onClick={() => setYearRange((prev) => prev + 10)}
              />
            </div>
            <div className="month grid grid-cols-3 py-2">
              {monthVal.map((item, index) => {
                return (
                  <div
                    className={`rounded-md py-3 text-center ${
                      year - yearRange === index ? "bg-blue-500 text-white" : ""
                    }`}
                    key={index}
                    onClick={() =>
                      onChange(new Date(`${yearRange + index}-01-01`))
                    }
                  >
                    <p className="text-lg">{yearRange + index}</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div
              className="year flex items-center justify-center gap-6"
              style={{ borderBottom: "1px solid #f2f2f2" }}
            >
              <FaAnglesLeft
                className="text-gray-500"
                onClick={() => setYear((prev) => prev - 1)}
              />
              <input
                className="w-16 border-none bg-transparent text-center text-lg font-medium outline-none"
                value={year}
                onChange={() => {}}
              />
              <FaAnglesRight
                className="text-gray-500"
                onClick={() => setYear((prev) => prev + 1)}
              />
            </div>
            <div className="month grid grid-cols-3">
              {monthVal.map((item, index) => {
                return (
                  <div
                    className={`rounded-md py-2 text-center ${
                      month === index ? "bg-blue-500 text-white" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      onChange(new Date(`${year}-${index + 1}-01`));
                    }}
                  >
                    <p className="text-2xl">{index + 1}</p>
                    <p
                      className={`font-light duration-200 ${
                        month === index ? "text-gray-200" : "text-gray-400"
                      }`}
                    >
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

import React, { useMemo } from "react";
import styled from "styled-components";
import { WorkDateType } from "../_utils/_interface";
import { getDate } from "@/lib/utils";
import { PopupWrapper } from "@/pages/taobangcong/popup/workShiftDetail";
import DayCheck from "../popup/dayCheck";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import homeQuery from "../_utils/_query";

const StyledBangCong = styled.div`
  .calendar {
    /* width: 100%; */
    /* height: 300px; */
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 20px; */
  }

  .calendar-grid {
    display: grid;
    /* grid-template-columns: repeat(7, 1fr); */
    /* grid-gap: 10px; */
  }
  .calendar-week,
  .calendar-header {
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    /* grid-gap: ; */
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
    }
  }
  .calendar-day {
    text-align: center;
  }

  /* .calendar-day span {
    font-size: 16px;
  } */
`;

const BangCong = ({ dayInfos, year, month, onSelect }) => {
  const { monthWorkQuery } = homeQuery();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const getDays = () => {
    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      days.push(new Date(year, month, i + 1));
    }
    return days;
  };

  const days = getDays();

  const getDayOfWeek = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  };

  const getFirstDayOfWeek = () => {
    const firstDayOfWeek = getDayOfWeek(firstDay);
    return firstDayOfWeek;
  };

  const getWeeks = () => {
    const weeks = [];
    const firstDayOfWeek = getFirstDayOfWeek();
    let dayIndex = 0;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          week.push(null);
        } else if (dayIndex >= daysInMonth) {
          week.push(null);
        } else {
          week.push(days[dayIndex]);
          dayIndex++;
        }
      }

      weeks.push(week);
    }

    return weeks;
  };
  const weeks = getWeeks();

  const [dayCheckPopup, setDayCheckPopup] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string>(null);

  const handleCellSelect = (date: Date) => {
    setSelectedDate(getDate(date));
    // setDayCheckPopup(true);
    const selectedData = monthWorkQuery?.data?.find(
      (dayInfo) => dayInfo.ngay === getDate(date)
    );

    onSelect(date, selectedData);
  };

  return (
    <>
      <StyledBangCong className="px-0">
        <div className="calendar rounded-lg shadow shadow-gray-300">
          <div
            className="flex items-center justify-between px-2 h-12"
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <FaChevronLeft size={16} color="#666" />
            <p className=" font-bold text-gray-600 uppercase">{`Tháng ${month}, ${year}`}</p>
            <FaChevronRight size={16} color="#666" />
          </div>
          <div className="calendar-header py-2 px-1 mt-2 w-full">
            <span className="font-medium text-gray-700">T2</span>
            <span className="font-medium text-gray-700">T3</span>
            <span className="font-medium text-gray-700">T4</span>
            <span className="font-medium text-gray-700">T5</span>
            <span className="font-medium text-gray-700">T6</span>
            <span className="font-medium text-gray-700">T7</span>
            <span className="font-medium text-red-500">CN</span>
          </div>
          <div className="calendar-grid pb-4">
            {weeks.map((week, cellIndex) => {
              console.log(
                "week, ",
                new Date(week[0]).getTime(),
                new Date(year, month + 1, 0).getTime()
              );
              if (cellIndex > 1 && !week[0]) return;
              return (
                <div key={cellIndex} className="flex justify-evenly p-1">
                  {week.map((day, index) => {
                    // if (cellIndex > 2 && !day) return;
                    return (
                      <Cell
                        onClick={day ? () => handleCellSelect(day) : undefined}
                        selected={day ? getDate(day) === selectedDate : false}
                        index={index}
                        day={day}
                        key={index}
                        dayInfos={dayInfos}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </StyledBangCong>

      {dayCheckPopup ? (
        <PopupWrapper onClose={() => setDayCheckPopup(false)}>
          <DayCheck
            day={selectedDate}
            onClose={() => setDayCheckPopup(false)}
          />
        </PopupWrapper>
      ) : null}
    </>
  );
};

export default BangCong;

type CellProps = {
  day: Date;
  index: number;
  dayInfos: WorkDateType[];
  selected: boolean;
  onClick?: () => void;
};

const StyledCell = styled.div`
  &.selected {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      border-radius: 50%;
      left: 0px;
      background-color: royalblue;
      z-index: 1;
    }

    &::before {
      width: 100%;
      height: 100%;
      background-color: royalblue;
      animation: pulse 2s linear infinite;
    }
  }

  /* &.selected::after {
    width: 100%;
    height: 100%;
  } */
`;

const Cell = ({ day, index, dayInfos, selected, onClick }: CellProps) => {
  const cellDate = useMemo(() => {
    if (!day) return;
    const thisDate = dayInfos.find((item) => item.ngay === getDate(day));
    return thisDate;
  }, [dayInfos]);

  return (
    <StyledCell
      onClick={() => onClick && onClick()}
      key={index}
      className={`h-7 w-7 flex items-center justify-center ${
        selected ? "selected" : ""
      }`}
    >
      <div
        className={`transition-[background-color] duration-500 h-full w-full flex items-center justify-center absolute z-10 rounded-full  ${
          cellDate ? " bg-blue-400 text-white" : ""
        } relative calendar-day ${
          index === 6 ? "text-red-600 font-medium" : ""
        } ${selected ? "bg-blue-700 text-white" : ""}`}
      >
        {day ? <span>{day.getDate()}</span> : <span>&nbsp;</span>}
      </div>

      {/* {cellDate && <span className="absolute top-0 right-1">v</span>} */}
    </StyledCell>
  );
};

import React, { useMemo } from "react";
import styled from "styled-components";
import { WorkDateType } from "../_utils/_interface";
import { getDate } from "@/lib/utils";
import { PopupWrapper } from "@/pages/taobangcong/popup/workShiftDetail";
import DayCheck from "../popup/dayCheck";

const StyledBangCong = styled.div`
  .calendar {
    width: 100%;
    /* height: 300px; */
    border: 1px solid #ccc;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 20px; */
  }

  .calendar-header span {
    font-size: 14px;
    font-weight: 400;
  }

  .calendar-grid {
    display: grid;
    /* grid-template-columns: repeat(7, 1fr); */
    /* grid-gap: 10px; */
  }
  .calendar-week,
  .calendar-header {
    text-align: center;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    /* grid-gap: ; */
  }

  .calendar-header span {
    padding: 4px 0;
    text-align: center;
    background-color: white;
  }
  .calendar-day {
    border: 1px solid #ececec;
    background-color: #fafafa;
    text-align: center;
  }

  .calendar-day span {
    font-size: 16px;
  }
`;

const BangCong = ({ dayInfos, year, month }) => {
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
    setDayCheckPopup(true);
  };

  return (
    <>
      <StyledBangCong className="shadow shadow-gray-700">
        <div className="calendar">
          <div className="calendar-header">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
          <div className="calendar-grid">
            {weeks.map((week, cellIndex) => (
              <div key={cellIndex} className="calendar-week">
                {week.map((day, index) => {
                  if (cellIndex > 2 && !day) return;
                  return (
                    <Cell
                      onClick={() => handleCellSelect(day)}
                      index={index}
                      day={day}
                      key={index}
                      dayInfos={dayInfos}
                    />
                  );
                })}
              </div>
            ))}
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
  onClick: () => void;
};

const Cell = ({ day, index, dayInfos, onClick }: CellProps) => {
  const cellDate = useMemo(() => {
    if (!day) return;
    const thisDate = dayInfos.find((item) => item.ngay === getDate(day));
    return thisDate;
  }, [dayInfos]);

  return (
    <div
      onClick={onClick}
      key={index}
      className={`py-3 ${
        cellDate ? "!bg-blue-200 text-blue-600" : ""
      } relative calendar-day ${
        index === 6 ? "!text-red-600 font-medium" : ""
      }`}
    >
      {day ? <span>{day.getDate()}</span> : <span>&nbsp;</span>}

      {cellDate && <span className="absolute top-0 right-1">v</span>}
    </div>
  );
};

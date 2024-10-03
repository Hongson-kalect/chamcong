import Calendar from "react-calendar";
import styled from "styled-components";

export const StyledCalendar = styled(Calendar)`
  outline: none !important;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid #16083b;
  padding: 2px 0px;
  display: flex !important;
  .react-calendar__viewContainer {
    flex: 1;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 4px 0;
    background-color: #3355f0;
    color: #ffffff;
    text-align: center;
    & * {
      text-decoration: none;

      font-size: 13px !important;
    }
    &:first-child {
    }
    &:nth-child(6) {
    }
    &:last-child {
    }
  }

  .react-calendar__viewContainer {
    border-radius: 12px;
    margin-top: -2px;
    flex: 1;
    .react-calendar__month-view {
      height: 100%;

      & > div:last-child {
        height: 100%;
        & > div:last-child {
          height: 100%;
          display: flex;
          flex-direction: column;
          & > div:last-child {
            flex: 1;
            button {
              /* padding: 6px 4px !important; */
              font-size: 14px;
              font-weight: 600;
              color: #444;
              border: none;
              /* box-shadow: 1px 1px 1px black; */
              background-color: transparent;
              transition: all 0.3s linear;
              &.react-calendar__month-view__days__day--weekend {
                background-color: #ffe9c0;
                color: #e2850b;
                /* background-color: red; */
              }
              &.react-calendar__tile--active {
                border-radius: 4px;
                background-color: #2e10d6 !important;
                animation: blink 2s cubic-bezier(0.39, 0.575, 0.565, 1) infinite;
                color: white !important;
              }
            }
          }
        }
      }
    }
  }

  /* height: 250px; */
  .react-calendar__month-view__weekNumbers {
    /* hide week number */
    display: none !important;
  }
  .react-calendar__tile {
    padding: 2px !important;
  }
  .react-calendar__navigation {
    margin: 0;
    height: 16%;
  }

  @keyframes blink {
    0% {
      border-color: red;
    }
    50% {
      border-color: blue;
    }
    100% {
      border-color: red;
    }
  }
`;

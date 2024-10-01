import * as React from "react";
import styled from "styled-components";

export interface IDaySelectProps {
  day: number;
  selected: boolean;
  onClick: () => void;
}

const StyledDate = styled.div`
  height: 60px;
  display: flex;
  padding: 4px 0%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 100%; */
  border-radius: 8px;
  background-color: #939393;
  color: white;

  &.selected {
    background-color: blue;
  }

  &.sun {
    background-color: #ff7777;
    &.selected {
      background-color: red;
    }
  }
  &.sat {
    background-color: #ffbe84;
    &.selected {
      background: #ff7700;
    }
  }
`;

export default function DaySelect(props: IDaySelectProps) {
  return (
    <StyledDate
      onClick={props.onClick}
      className={`${props.selected ? "selected" : ""} ${
        props.day == 6 ? "sat" : props.day == 0 ? "sun" : ""
      }`}
    >
      {props.day ? "Thu" : null}
      <div className="mt-1 flex-1 text-xl font-semibold">
        {props.day ? props.day + 1 : "CN"}
      </div>
    </StyledDate>
  );
}

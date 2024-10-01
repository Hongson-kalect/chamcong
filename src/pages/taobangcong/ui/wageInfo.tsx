import { Button, Select } from "antd";
import * as React from "react";
import { defaultWage } from "../_utils/_utils";
import { WorkWageType } from "../_utils/_interface";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "zmp-ui";

export interface IWageInfoProps {
  active: boolean;
  onClose: () => void;
}

export default function WageInfo(props: IWageInfoProps) {
  const navigate = useNavigate();
  const [wageInfo, setWageInfo] = React.useState<WorkWageType>(
    JSON.parse(JSON.stringify(defaultWage))
  );

  const addNewBonus = () => {
    wageInfo.bonus.push({ name: "Thuong them", value: 100000, unit: "vnd" });
    setWageInfo({ ...wageInfo });
  };

  const clearBonus = (index: number) => {
    wageInfo.bonus.splice(index, 1);
    setWageInfo({ ...wageInfo });
  };

  const changeBonusName = (value, index) => {
    wageInfo.bonus[index].name = value;
    setWageInfo({ ...wageInfo });
  };
  const changeBonusValue = (value, index) => {
    wageInfo.bonus[index].value = value;
    setWageInfo({ ...wageInfo });
  };

  const addNewDeduct = () => {
    wageInfo.deduct.push({ name: "Khau tru", value: 100000, unit: "vnd" });
    setWageInfo({ ...wageInfo });
  };

  const clearDeduct = (index: number) => {
    wageInfo.deduct.splice(index, 1);
    setWageInfo({ ...wageInfo });
  };

  const changeDeductName = (value, index) => {
    wageInfo.deduct[index].name = value;
    setWageInfo({ ...wageInfo });
  };
  const changeDeductValue = (value, index) => {
    wageInfo.deduct[index].value = value;
    setWageInfo({ ...wageInfo });
  };

  const saveWage = () => {
    console.log(wageInfo);
    navigate("/");
  };

  return (
    <div
      className={`w-full fixed top-0 left-0 h-screen set-wage ${
        props.active ? "translate-x-0" : "translate-x-[-100%]"
      } duration-200 bg-white`}
    >
      <div className="status-bar h-10 bg-gradient-to-r from-blue-600 to-blue-800 w-screen"></div>
      <div
        className="w-full header relative h-12 text-center text-gray-600 text-xl font-medium flex items-center justify-center"
        style={{ borderBottom: "1px solid #E3E3E3" }}
      >
        <p>Tao tien luong</p>
        <div
          onClick={props.onClose}
          className="absolute pt-2.5 top-0 left-0 pl-4 font-medium"
        >
          {"<"}
        </div>
      </div>

      <div className="flex items-center">
        <p>Luong co ban</p>
        <input
          type="number"
          value={wageInfo.baseWage}
          onChange={(e) =>
            setWageInfo({ ...wageInfo, baseWage: Number(e.target.value) })
          }
        />
      </div>
      <div className="flex items-center">
        <p>Phu cap sinh hoat</p>
        <input
          type="number"
          value={wageInfo.lifeBonus}
          onChange={(e) =>
            setWageInfo({ ...wageInfo, baseWage: Number(e.target.value) })
          }
        />
      </div>

      <p>Phu cap khac</p>
      {wageInfo.bonus.length > 0 &&
        wageInfo.bonus.map((bonus, index) => {
          return (
            <div key={index} className="flex items-center gap-4">
              <input
                className={`border-none outline-none shadow-black focus:shadow-inner px-2 py-1`}
                spellCheck={false}
                value={bonus.name}
                onChange={(e) => changeBonusName(e.target.value, index)}
              />
              <input
                type="number"
                className={`border-none outline-none shadow-black focus:shadow-inner px-2 py-1`}
                spellCheck={false}
                value={bonus.value}
                onChange={(e) => changeBonusValue(e.target.value, index)}
              />
              {/* <div>{bonus.name}</div>
            <div>{bonus.value}</div> */}

              <div
                className="px-2 py-1 shadow shadow-black"
                onClick={() => clearBonus(index)}
              >
                {" "}
                -{" "}
              </div>
            </div>
          );
        })}
      <div className="text-center flex items-center justify-center mt-2">
        <AiOutlinePlus
          onClick={addNewBonus}
          size={48}
          className="text-gray-400 p-2 rounded-md"
          style={{ border: "1px solid #dadada" }}
        />
      </div>

      <p>Khau tru</p>

      {wageInfo.deduct.length > 0 &&
        wageInfo.deduct.map((deduct, index) => {
          return (
            <div key={index} className="flex items-center gap-4">
              <input
                className={`border-none outline-none shadow-black focus:shadow-inner px-2 py-1`}
                spellCheck={false}
                value={deduct.name}
                onChange={(e) => changeDeductName(e.target.value, index)}
              />
              <input
                type="number"
                className={`border-none outline-none shadow-black focus:shadow-inner px-2 py-1`}
                spellCheck={false}
                value={deduct.value}
                onChange={(e) => changeDeductValue(e.target.value, index)}
              />
              {/* <div>{Deduct.name}</div>
            <div>{Deduct.value}</div> */}

              <div
                className="px-2 py-1 shadow shadow-black"
                onClick={() => clearDeduct(index)}
              >
                {" "}
                -{" "}
              </div>
            </div>
          );
        })}

      <div className="text-center flex items-center justify-center mt-2">
        <AiOutlinePlus
          onClick={addNewDeduct}
          size={48}
          className="text-gray-400 p-2 rounded-md"
          style={{ border: "1px solid #dadada" }}
        />
      </div>

      <div className="h-20"></div>
      <div className="fixed bottom-4 left-0 right-0 px-8">
        <div
          className="px-4 py-1 rounded-lg text-white bg-blue-600 flex items-center justify-center h-12 text-lg"
          onClick={saveWage}
        >
          Hoan tat
        </div>
      </div>
    </div>
  );
}

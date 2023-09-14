import { COLOR_WELFARE, clickStyle } from "../constants/styles.constants";
import { useState } from "react";
import Arrow from "../assets/Arrow";

const Indicator = ({ progress, imageUrl, name, onClick, isSelected }) => {
  const [clickButton, setClickButton] = useState(false);

  const handleClick = () => {
    setClickButton(!clickButton);
  };
  const getColor = () => {
    let currentColor = "#FF0000";

    for (const key in COLOR_WELFARE) {
      if (progress <= parseInt(key)) {
        currentColor = COLOR_WELFARE[key];
        break;
      }
    }
    return currentColor;
  };

  const handleButtonClick = () => {
    onClick(name);
  };

  return (
    <>
      <div
        className={`h-screen-[50%] flex m-[1vh] p-[1vh] items-center rounded-lg ${
          isSelected ? "bg-green-400" : ""
        }`}
      >
        <div>
          <button
            className="rounded-lg overflow-hidden hover:bg-blue-500"
            onClick={handleButtonClick}
          >
            <img
              className={`h-[3vw] ${isSelected ? "bg-white" : ""}`}
              src={imageUrl}
              alt={name}
            />
          </button>
        </div>

        <div className="grid items-center w-full ml-2 bg-white rounded-full h-1/2 font-bold">
          <div
            className="rounded-full text-[1vw]"
            style={{
              width: `${progress}%`,
              backgroundColor: getColor(),
            }}
          >
            {Math.round(progress)}%
          </div>
        </div>
        <div className="flex items-center ml-1 rounded-lg">
          <button onClick={handleClick}>
            <div
              className={`transform h-8 ml-1 ${
                !clickButton ? "rotate-90" : ""
              }`}
            >
              <Arrow color={`${clickButton ? "red" : "black"}`} />
            </div>
          </button>
        </div>
      </div>
      <div className={`grid ${!clickButton ? "hidden" : ""}`}>
        <table>
          <thead>
            <tr>
              <th>Variables:</th>
            </tr>
          </thead>
          <tbody>
            <tr>Indicator 1</tr>
            <tr>Indicator 2</tr>
            <tr>Indicator 3</tr>
            <tr>Indicator n</tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Indicator;

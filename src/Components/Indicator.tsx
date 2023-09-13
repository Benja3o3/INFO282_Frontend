// Indicator.js
import React, { useState } from "react";
import { COLOR_WELFARE } from "./constants.tsx";
import "tailwindcss/tailwind.css";

const Indicator = ({ progress, imageUrl, name, onClick, isSelected }) => {
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
    // Llamar a la función onClick con el nombre como argumento
    onClick(name);
  };

  return (
    <div className="h-screen-[50%] flex m-2 p-2 items-center ">
      <div className="">
        <button
          className={`bg-white rounded-full overflow-hidden ${
            isSelected ? "bg-green-400 " : " "
          }`}
          onClick={handleButtonClick}
        >
          <img className="h-10" src={imageUrl} />
        </button>
      </div>

      <div className="grid items-center w-full ml-2 bg-white rounded-full h-1/2 font-bold">
        <div
          className="rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Indicator;

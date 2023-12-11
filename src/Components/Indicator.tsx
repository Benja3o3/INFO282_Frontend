import { COLOR_WELFARE } from "../constants/styles.constants";
import { useEffect, useState } from "react";
import Arrow from "../assets/Arrow";
import Dot from "../assets/Dot";
import PopUp from "./PopUp";

import config from "../config.ts";

interface IndicadorProps {
  progress: number;
  imageUrl: string;
  name: string;
  type: string;
  cut: number;
  onClick: (name: string) => void;
  isSelected: boolean;
}
interface Variable {
  dimension: string;
  indicador: string;
  valor: number;
}

const Indicator = ({
  progress,
  imageUrl,
  name,
  type,
  cut,
  onClick,
  isSelected,
}: IndicadorProps) => {
  const [clickButton, setClickButton] = useState(false);
  const [popUpButton, setPopUpButton] = useState(false);
  const [variables, setVariables] = useState<Variable[]>([]);
  let value = (progress * 100).toFixed(2);

  const handleClick = () => {
    setClickButton(!clickButton);
    console.log(variables);
  };

  useEffect(() => {
    const buildURL = (tipo: string) => {
      if (type != "pais") {
        return `${config.apiUrl}/${tipo}/indicador/${cut}`;
      }
      return `${config.apiUrl}/${tipo}/indicador/`;
    };

    fetch(buildURL(type))
      .then((response) => response.json())
      .then((json) => setVariables(json));
  }, [type, cut, name]);

  const handleClickPopUp = () => {
    setPopUpButton(!popUpButton);
  };

  const getColor = () => {
    const progressRanges = [0.0, 0.17, 0.33, 0.5, 0.67, 0.83, 1.0];
    let currentColor = COLOR_WELFARE[0]; // Color predeterminado

    for (let i = 0; i < progressRanges.length; i++) {
      if (progress >= progressRanges[i] && progress < progressRanges[i + 1]) {
        currentColor = COLOR_WELFARE[i];
        break;
      }
    }
    return currentColor;
  };

  const handleButtonClick = () => {
    onClick(name);
  };
  const handleClosePopUp = () => {
    setPopUpButton(false);
  };

  const indicators = variables.filter((item) => item.dimension === name);
  let valores = indicators.map((item) => item.indicador);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        className={`flex mb-2 p-2 items-center rounded-lg ${
          isSelected ? "bg-green-400" : ""
        }`}
      >
        <div>
          <button
            className="rounded-lg overflow-hidden hover:bg-blue-500"
            onClick={handleButtonClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`h-[3vw]  ${isSelected ? "bg-white" : ""}`}
              src={imageUrl}
              alt={name}
            />
          </button>
        </div>
        <div className="w-full ml-2">
          {isHovered && (
            <div className=" text-center font-bold">
              <span>{name}</span>
            </div>
          )}
          <div className="w-full ml-2 bg-white rounded-full font-bold">
            <div
              className="rounded-full text-[1vw] text-center"
              style={{
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: getColor(),
              }}
            >
              {value}%
            </div>
          </div>
        </div>

        <div className="flex items-center ml-1 rounded-lg">
          <button onClick={handleClick}>
            <div
              className={`transform ml-1 ${!clickButton ? "rotate-90" : ""}`}
            >
              <Arrow color={`${clickButton ? "white" : "black"}`} />
            </div>
          </button>
        </div>
        <div className="flex items-center ml-1 rounded-lg">
          <button onClick={handleClickPopUp}>
            <div className={`transform ml-1 `}>
              <Dot color={`${popUpButton ? "white" : "black"}`} />
            </div>
          </button>
        </div>
        <div>
          <PopUp
            isOpen={popUpButton}
            onClose={handleClosePopUp}
            name={name}
            data={valores}
          />
        </div>
      </div>

      <div
        className={`grid place-items-center ${!clickButton ? "hidden" : ""}`}
      >
        <table className="">
          <thead>
            <tr>
              <th>Variables:</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((indicator) => (
              <tr key={indicator.indicador}>
                <td>{indicator.indicador}:</td>
                <td>
                  <div className="w-full ml-2 bg-white rounded-full font-bold">
                    <div
                      className="rounded-full text-[1vw] text-center"
                      style={{
                        width: `${indicator.valor * 100}%`,
                        backgroundColor: getColor(),
                      }}
                    >
                      {(indicator.valor * 100).toFixed(2)}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Indicator;

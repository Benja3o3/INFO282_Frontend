import { COLOR_WELFARE } from "../constants/styles.constants";
import { useState } from "react";
import Arrow from "../assets/Arrow";
import Dot from "../assets/Dot";
import PopUp from "./PopUp";

interface IndicadorProps {
  progress: number;
  imageUrl: string;
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
}

const Indicator = ({
  progress,
  imageUrl,
  name,
  onClick,
  isSelected,
}: IndicadorProps) => {
  const [clickButton, setClickButton] = useState(false);
  const normalizedProgress = Math.min(100, progress);
  const [popUpButton, setPopUpButton] = useState(false);

  const handleClick = () => {
    setClickButton(!clickButton);
  };

  const handleClickPopUp = () => {
    setPopUpButton(!popUpButton);
  };
  const getColor = () => {
    const colorKeys = Object.keys(COLOR_WELFARE).map(Number); // Obtener las claves como números
    const maxKey = Math.max(...colorKeys); // Encontrar la clave máxima
    let currentColor = COLOR_WELFARE[maxKey]; // Color predeterminado (el más alto)

    for (let i = 0; i < colorKeys.length; i++) {
      const key = colorKeys[i];
      const nextKey = colorKeys[i + 1] || maxKey; // Si no hay siguiente, usar el máximo
      if (progress >= key && progress < nextKey) {
        // Verificar si el progreso está en el rango actual
        currentColor = COLOR_WELFARE[key];
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
          >
            <img
              className={`h-[3vw]  ${isSelected ? "bg-white" : ""}`}
              src={imageUrl}
              alt={name}
            />
          </button>
        </div>
        {/* Barra de progreso */}
        <div className="w-full ml-2 bg-white rounded-full font-bold">
          <div
            className="rounded-full text-[1vw] text-center"
            style={{
              width: `${Math.round(normalizedProgress)}%`,
              backgroundColor: getColor(),
            }}
          >
            {Math.round(normalizedProgress)}%
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
          <PopUp isOpen={popUpButton} onClose={handleClosePopUp} name={name} />
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
          {/* <tbody>
            <tr>Indicator 1</tr>
            <tr>Indicator 2</tr>
            <tr>Indicator 3</tr>
            <tr>Indicator n</tr>
          </tbody> */}
        </table>
      </div>
    </>
  );
};

export default Indicator;

import { COLOR_WELFARE } from "../constants/styles.constants";
import { useEffect, useState } from "react";
import Arrow from "../assets/Arrow";
import Dot from "../assets/Dot";
import PopUp from "./PopUp";

interface IndicadorProps {
  progress: number;
  imageUrl: string;
  name: string;
  type: string;
  cut: number;
  onClick: (name: string) => void;
  isSelected: boolean;
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
  let value = (progress * 100).toFixed(2);
  const [popUpButton, setPopUpButton] = useState(false);
  const [variables, setVariables] = useState([]);

  const handleClick = () => {
    setClickButton(!clickButton);
  };

  useEffect(() => {
    const buildURL = (tipo: string) => {
      if (type != "pais") {
        return `http://localhost:5002/${tipo}/indicador/${cut}`;
      }
      return `http://localhost:5002/${tipo}/indicador/`;
    };

    fetch(buildURL(type))
      .then((response) => response.json())
      .then((json) => setVariables(json));
  }, [type, cut, name]);
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
      if (progress * 10 >= key && progress * 10 < nextKey) {
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

  // Filtra los indicadores que tienen dimension igual al nombre
  const indicators = variables.filter((item) => item.dimension === name);
  let valores = indicators.map((item) => item.indicador);

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

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
  isOpen: boolean;
  onToggleOpen: () => void;
  openResumeClick: (name:string, value:any) => void;
  
  
}
interface Variable {
  dimension: string;
  indicador: string;
  valor: number;
}

interface Indicador {
  nombre: string;
  prioridad: string;
  descripcion: string;
  fuente: string;
}

const Indicator = ({
  progress,
  imageUrl,
  name,
  type,
  cut,
  onClick,
  isSelected,
  isOpen,
  onToggleOpen,
  openResumeClick,
  
}: IndicadorProps) => {
  const [clickButton, setClickButton] = useState(false);
  const [popUpButton, setPopUpButton] = useState(false);
  const [variables, setVariables] = useState<Variable[]>([]);

  let value = (progress * 100).toFixed(2);



  const handleClick = () => {
    onToggleOpen();
    setClickButton(!clickButton);
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
    openResumeClick(name, valores)
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
  const getColorValue = (value: number) => {
    const progressRanges = [0.0, 0.17, 0.33, 0.5, 0.67, 0.83, 1.0];
    let currentColor = COLOR_WELFARE[0]; // Color predeterminado
  
    for (let i = 0; i < progressRanges.length; i++) {
      if (value >= progressRanges[i] && value < progressRanges[i + 1]) {
        currentColor = COLOR_WELFARE[i];
        break;
      }
    }
  
    return currentColor;
  };

  const handleButtonClick = () => {
    onClick(name);
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
        className={`flex items-center rounded-lg ${
          isSelected ? "bg-green-400" : ""
        }`}
      >
          <div className="flex flex-row items-center">
          <button
            className="rounded-lg overflow-hidden hover:bg-blue-500"
            onClick={handleButtonClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`h-12 w-16 mt-5  ${isSelected ? "bg-white" : ""}`}
              src={imageUrl}
              alt={name}
            />
          </button>
        </div>
        <div className="w-full flex justify-end mt-5  ml-5">
          
          {/*Barra de porcentaje*/}
          <div className="w-full ml-25relative">
          <span> {name}</span>
            <div className=" bg-selectorgrey rounded-r-lg">
            <div 
              className="text-[vw] text-center  "
              style={{
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: getColor(),
                textAlign: "left",
                color: "white",
                
              }}
            >
            <span className="ml-2 text-white ">{value}%</span>
            </div>
            </div>
          </div>
          
          {/* Abre variables*/}
          <div className="flex items-center ml-1 mt-5 rounded-lg">
          <button onClick={handleClick}>
            <div
              className={`transform ml-1 ${!clickButton ? "rotate-90" : ""}`}
            >
              <Arrow color={`${clickButton ? "gray" : "black"}`} />
            </div>
          </button>
        </div>

        {/*Abre popup*/}
        <div className="flex mt-5 items-center ml-1 rounded-lg">
          <button onClick={handleClickPopUp}>
            <div className={`transform ml-1 `}>
              <Dot color={`${popUpButton ? "gray" : "black"}`} />
            </div>
          </button>
        </div>
        </div>      
      </div>

    

      {/*indicadores*/}
      <div className={`mt-5  flex items-center flex-col  ${!isOpen ? "hidden" : ""}` }>
      <span className="font-roboto font-boldF">Indicadores</span>
            
        <table className="w-full ml-20">
        <tbody>
        </tbody>
        {indicators.map((indicator) => (
            <tr key={indicator.indicador}>
            <td className="text-sm overflow-hidden" style={{ maxWidth: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap',  textAlign: 'left'  }}>
              {indicator.indicador}:
            </td>
            <td className="text-sm text-right">
            <div
            className="rounded-full"
            style={{
              width: "40px", 
              height: "40px", 
              borderRadius: "50%", 
              backgroundColor: getColorValue((indicator.valor)),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white", 
              fontSize: "12px",
            }}


          >
          {(indicator.valor * 100).toFixed(2)}%
        </div>
            </td>
            </tr>
          ))}
        </table>
      </div>


    </>
  );
};

export default Indicator;

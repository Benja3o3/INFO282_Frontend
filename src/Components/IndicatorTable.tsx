import { useEffect, useState } from "react";
import Indicator from "./Indicator";
import { INDICATOR_DATA } from "../constants/indicators.constants";

import config from "../config.ts";

const onclickData = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/regiones/`);
    const content = await response.text();

    const blob = new Blob([content], { type: "text/plain" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Archivo.txt";
    document.body.appendChild(a);
    a.click();

    // Eliminar el enlace del DOM después de descargar
    document.body.removeChild(a);

    // Liberar el objeto URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};

interface IndicadorTableProps {
  cut: number;
  type: string;
  onButtonCategoryChange: (categoryName: string) => void; // Add this prop
}

type Diccionario = {
  id: number;
  nombre: string;
  valor: number;
  comuna_id: number;
};

export default function IndicatorTable({
  cut,
  type,
  onButtonCategoryChange,
}: IndicadorTableProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(
    null
  );
  const [dataDicc, setDataDicc] = useState<Diccionario[]>([]);

  useEffect(() => {
    const buildURL = (tipo: string) => {
      if (type != "pais") {
        return `${config.apiUrl}/${tipo}/dimension/${cut}`;
      }
      return `${config.apiUrl}/${tipo}/dimension/`;
    };

    fetch(buildURL(type))
      .then((response) => response.json())
      .then((json) => setDataDicc(json));
  }, [selectedIndicator, cut]);

  const onclick = (buttonName: string) => {
    setSelectedIndicator(buttonName);
    console.log("Nombre Indicador", buttonName);
    console.log("Nombre p/r/c", cut);
    onButtonCategoryChange(buttonName);
  };

  return (
    <div className="p-2 h-screen flex flex-col">
      <h1 className="text-[2vw] font-semibold text-center">
        BAROMETRO BIENESTAR
      </h1>

      <div className="grid grid-rows-1 ">
        <div className="">
          {INDICATOR_DATA.map((indicator) => {
            const matchingData = dataDicc.find(
              (dicc) => dicc.nombre === indicator.name
            );
            const progressValue = matchingData ? matchingData.valor : 0;

            return (
              <Indicator
                key={indicator.name}
                name={indicator.name}
                progress={progressValue}
                imageUrl={indicator.imageUrl}
                onClick={onclick}
                type={type}
                cut={cut}
                isSelected={selectedIndicator === indicator.name}
              />
            );
          })}
        </div>
        <hr className="border-2 border-solid rounded-lg border-white mt-2" />
        <div className="text-white grid place-items-center">
          <button
            onClick={onclickData}
            className="bg-blue-500 p-2 m-2 rounded-full w-1/2 text-[1vw] font-semibold hover:bg-green-400"
          >
            Exportar data
          </button>
        </div>
      </div>
    </div>
  );
}

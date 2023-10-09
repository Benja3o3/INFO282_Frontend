import { useEffect, useState } from "react";
import Indicator from "./Indicator";
import { INDICATOR_DATA } from "../constants/indicators.constants";

const onclickData = () => {
  alert("Exportar datos en CSV o KML");
};

interface IndicadorTableProps {
  selectedNameMap: number;
}

type Diccionario = {
  id: number;
  nombre: string;
  valor: number;
  comuna_id: number;
};

export default function IndicatorTable({
  selectedNameMap,
}: IndicadorTableProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(
    null
  );
  const [dataDicc, setDataDicc] = useState<Diccionario[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5002/dimension/${selectedNameMap}`)
      .then((response) => response.json())
      .then((json) => setDataDicc(json));
  }, [selectedIndicator, selectedNameMap]);

  const onclick = (buttonName: string) => {
    setSelectedIndicator(buttonName);
    console.log("Nombre Indicador", buttonName);
    console.log("Nombre p/r/c", selectedNameMap);
    if (dataDicc) {
      console.log(dataDicc);
    }
  };

  return (
    <div className="p-2 h-screen flex flex-col">
      <h1 className="text-[2vw] font-semibold text-center">
        WELFARE BAROMETER
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
                progress={
                  progressValue != 0 ? progressValue : indicator.progress
                }
                imageUrl={indicator.imageUrl}
                onClick={onclick}
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
            Export data
          </button>
        </div>
      </div>
    </div>
  );
}

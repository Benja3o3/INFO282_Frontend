import { useEffect, useState } from "react";
import Indicator from "./Indicator";
import { INDICATOR_DATA } from "../constants/indicators.constants";

const onclickData = () => {
  alert("Exportar datos en CSV o KML");
};

interface IndicadorTableProps {
  selectedNameMap: string;
}

export default function IndicatorTable({
  selectedNameMap,
}: IndicadorTableProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [selectedIndicator, selectedNameMap]);

  const onclick = (buttonName: string) => {
    setSelectedIndicator(buttonName);
    console.log("Nombre Indicador", buttonName);
    console.log("Nombre p/r/c", selectedNameMap);
  };

  return (
    <div className="h-full w-full rounded-lg">
      <div>
        {INDICATOR_DATA.map((data) => (
          <Indicator
            key={data.name}
            name={data.name}
            progress={data.progress}
            // dataIndicator = {} // Aqui se deberia recibir la data de cada indicador junto con los subindicadores
            imageUrl={data.imageUrl}
            onClick={onclick}
            isSelected={selectedIndicator === data.name}
          />
        ))}
      </div>
      <hr className="border-2 border-solid rounded-lg border-white m-3" />
      <div className="text-white place-items-center">
        <button
          onClick={onclickData}
          className="bg-blue-500 p-2 rounded-full w-1/2 text-[1vw] font-semibold hover:bg-green-400"
        >
          Export data
        </button>
      </div>
    </div>
  );
}

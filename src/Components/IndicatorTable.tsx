import { useEffect, useState } from "react";
import Indicator from "./Indicator";
import { INDICATOR_DATA } from "../constants/indicators.constants";
import ExportDataButton from "./ExportDataButton.tsx";
import SearchBox from "./SearchBox.tsx";

import config from "../config.ts";

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
  const handleSearch = (query: string) => {
    alert("Búsqueda realizada: " + query);
  };

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

    onButtonCategoryChange(buttonName);
  };

  return (
    <div className="p-2 h-screen flex flex-col">
      <h1 className="text-[2vw] font-semibold text-center">
        BAROMETRO BIENESTAR
      </h1>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
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
          <ExportDataButton />
        </div>
        <div className="flex">
          <SearchBox onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

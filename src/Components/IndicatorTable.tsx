import { useState } from "react";
import Indicator from "./Indicator";
import { INDICATOR_DATA } from "./constants";
import "tailwindcss/tailwind.css";

const onclickData = () => {
  alert("Exportar datos en CSV o KML");
};

export default function IndicatorTable() {
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const onclick = (buttonName: any) => {
    setSelectedIndicator(buttonName);
    alert(buttonName);
    // Realiza aqui las peticiones pero falta obtener la region o comuna seleccionada o pais completo
  };

  return (
    <div className="h-full w-full rounded-lg">
      <div>
        {INDICATOR_DATA.map((data) => (
          <Indicator
            name={data.name}
            progress={data.progress}
            imageUrl={data.imageUrl}
            onClick={onclick}
            isSelected={selectedIndicator == data.name}
          />
        ))}
      </div>
      <hr className="" />
      <div className="text-white place-items-center">
        <button
          onClick={onclickData}
          className="bg-[#1aae9f] p-2 rounded-full w-1/2"
        >
          Export data
        </button>
      </div>
    </div>
  );
}

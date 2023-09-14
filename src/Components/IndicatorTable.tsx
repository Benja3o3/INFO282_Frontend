import { useState } from "react";
import Indicator from "./Indicator";
import { INDICATOR_DATA } from "../constants/indicators.constants";
import axios from "axios";

const onclickData = () => {
  alert("Exportar datos en CSV o KML");
};

export default function IndicatorTable({ selectedNameMap }) {
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const onclick = (buttonName) => {
    setSelectedIndicator(buttonName);
    console.log("Nombre Indicador", buttonName);
    console.log("Nombre p/r/c", selectedNameMap);
    // fetch("http://localhost:5002/indicador/1")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // Realiza aquí las peticiones??? estudiar esto
    axios
      .get("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => {
        if (response.status === 200) {
          return response.data; // Convierte la respuesta a JSON
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((jsonData) => {
        console.log(jsonData); // Imprime los datos en la consola
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="h-full w-full rounded-lg">
      <div>
        {INDICATOR_DATA.map((data) => (
          <Indicator
            key={data.name}
            name={data.name}
            progress={data.progress}
            imageUrl={data.imageUrl}
            onClick={onclick}
            isSelected={selectedIndicator === data.name}
          />
        ))}
      </div>
      <hr className="" />
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

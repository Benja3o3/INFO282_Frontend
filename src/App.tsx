import Map from "./Components/Map.tsx";
import Charts from "./Components/Charts.tsx";
import IndicatorTable from "./Components/IndicatorTable.tsx";
import { useEffect, useState } from "react";
import Barometer from "./Components/Barometer.tsx";

export default function App() {
  const [selectCut, setSelectCut] = useState(0);
  const [type, setType] = useState("pais");
  const [bienestar, setBienestar] = useState(0);
  const [category, setCategory] = useState("");

  const handleNameMapChange = (
    cut: number,
    type: string,
    bienestar: number
  ) => {
    setSelectCut(cut);
    setType(type);
    setBienestar(bienestar);
  };

  const handleButtonCategoryChange = (categoryName) => {
    setCategory(categoryName);
  };

  useEffect(() => {
    fetch("http://localhost:5002/pais/")
      .then((response) => response.json())
      .then((json) => setBienestar(json[0].valor_bienestar));
  }, []);

  return (
    <div className="grid grid-cols-[1fr,1fr,2fr] gap-2 h-screen">
      <div className="bg-slate-200 rounded-lg">
        <IndicatorTable
          cut={selectCut}
          type={type}
          onButtonCategoryChange={handleButtonCategoryChange}
        />
      </div>
      <div className="bg-slate-200 rounded-lg">
        <Charts cut={selectCut} type={type} category={category} />
      </div>
      <div className="z-0">
        <Map onNameMapChange={handleNameMapChange} />
      </div>
      <div className="absolute bottom-0 mb-2 right-[33%] bg-white rounded-lg p-2">
        <h1 className="text-center font-semibold">BAROMETRO</h1>
        <Barometer radius={100} numberOfSections={6} value={bienestar} />
      </div>
    </div>
  );
}

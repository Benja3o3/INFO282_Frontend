import Map from "./Components/Map.tsx";
import Charts from "./Components/Charts.tsx";
import IndicatorTable from "./Components/IndicatorTable.tsx";
import { useEffect, useState } from "react";
import Barometer from "./Components/Barometer.tsx";
import config from "./config.ts";
import Header from "./Components/Header.tsx";
import PopUp from "./Components/PopUp.tsx";
import { Chart } from "chart.js";

export default function App() {
  const [selectCut, setSelectCut] = useState(0);
  const [type, setType] = useState("pais");
  const [bienestar, setBienestar] = useState(0);
  const [category, setCategory] = useState("");
  const [showCharts, setShowCharts] = useState(true);


  const handleNameMapChange = (
    cut: number,
    type: string,
    bienestar: number
  ) => {
    setSelectCut(cut);
    setType(type);
    setBienestar(bienestar);
  };

  const handleButtonCategoryChange = (categoryName: string) => {
    setCategory(categoryName);
    console.log(categoryName);
  };

  useEffect(() => {
    fetch(`${config.apiUrl}/pais/`)
      .then((response) => response.json())
      .then((json) => setBienestar(json[0].valor_bienestar));
  }, []);

  return (
    <>
      <div>
        <Header></Header>
        <div className="w-full h-screen bg-back object-cover flex item-center">

          <IndicatorTable
              cut={selectCut}
              type={type}
              onButtonCategoryChange={handleButtonCategoryChange} />
          <Charts cut={selectCut} type={type} category={category} />

          <Map onNameMapChange={handleNameMapChange} />
         

        </div>

      </div>
      <div className="absolute bottom-0 mb-2 left-1/2 transform -translate-x-1/2 rounded-lg p-2 bg-white" style={{ zIndex: 9999 }}>
      <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <Barometer radius={100} numberOfSections={6} value={bienestar} />
      <h1 className="text-center font-semibold rounded-lg" >BAROMETRO</h1>
    </div>
    </div>
      </>
      );
}


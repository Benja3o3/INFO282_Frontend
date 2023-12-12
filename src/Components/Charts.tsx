import { useEffect, useState } from "react";
import Ranking from "./Ranking.tsx";
import LineChart from "./LineChart.tsx";
import RadarChart from "./radarChart.tsx";
import config from "../config.ts";
import Arrow from "../assets/Arrow.svg";
import ArrowLeft from "../assets/ArrowLeft.svg";



interface ChartProps {
  cut: number;
  type: string;
  category: string;
}

export default function Charts({ cut, type, category }: ChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const buildURL = (tipo: string) => {
      if (type != "pais") {
        return `${config.apiUrl}/${tipo}/dimension/${cut}`;
      }
      return `${config.apiUrl}/${tipo}/dimension/`;
    };

    fetch(buildURL(type))
      .then((response) => response.json())
      .then((json) => {
        json.sort((a: { nombre: string }, b: { nombre: string }) =>
          a.nombre.localeCompare(b.nombre)
        );
        const labels = json.map((item: { nombre: string }) => item.nombre);
        const data = json.map((item: { valor: number }) => item.valor);
        setLabels(labels);
        setData(data);
      });
  }, [cut, type]);

  return (
    <>
      <div className="h-screen flex flex-col relative  ">
        <div className={`${toggle ? "w-[1.0rem]" : ""} flex flex-col overflow-auto max-h-screen scrollbar-hide`}>

          <div className="flex items-center justify-between bg-sectiongrey">
            <span className="ml-44 text-center font-roboto font-extrabold">
              Graficos
            </span>
          </div>
        <div className="absolute top-1/2 right-0  transform -translate-y-1/2 rounded-lg bg-gray-50 hover:bg-gray-100  ">
        <button 
        className={`  ${!toggle ? '' : 'scale-x-[-1]'}`} 
        onClick={() => {setToggle(!toggle)}}
      > 
        <img src={ArrowLeft} alt="Arrow" className="w-6 h-6" />
      </button>
      </div>


          <div className="ml-4 mr-24 justify-center h-screen w-80">
            <div style={{ width: '400px' }}>
              <Ranking />
              <LineChart category={category} />
              <RadarChart labels={labels} data={data} />
            </div>
          </div>
        </div>

    </div>
    
    </>
  );
}


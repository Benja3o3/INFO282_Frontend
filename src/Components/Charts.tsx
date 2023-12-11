import { useEffect, useState } from "react";
import Ranking from "./Ranking.tsx";
import LineChart from "./LineChart.tsx";
import RadarChart from "./radarChart.tsx";
import config from "../config.ts";

interface ChartProps {
  cut: number;
  type: string;
  category: string;
}

export default function Charts({ cut, type, category }: ChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
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
    <div className="p-2 h-screen flex flex-col">
      <h1 className="text-[2vw] font-semibold text-center">GRAFICOS</h1>
      <div className=" grid grid-rows-2 gap-3 mb-2">
        <div className=" bg-white p-2 rounded-lg">
          <Ranking />
        </div>
        <div className="bg-white p-2 rounded-lg">
          <LineChart category={category} />
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg flex-grow">
        <RadarChart labels={labels} data={data} />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import BarChart from "./BarChart.tsx";
import LineChart from "./LineChart.tsx";
import PieChart from "./PieChart.tsx";

interface ChartProps {
  cut: number;
  type: string;
}

export default function Charts({ cut, type }: ChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  useEffect(() => {
    const buildURL = (tipo: string) => {
      if (type != "pais") {
        return `http://localhost:5002/${tipo}/dimension/${cut}`;
      }
      return `http://localhost:5002/${tipo}/dimension/`;
    };

    // Realizar la solicitud fetch según el tipo
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

      <div className=" grid grid-rows-2 gap-3 mb-3">
        <div className=" bg-white p-2 rounded-lg">
          <BarChart labels={labels} data={data} />
        </div>
        <div className="bg-white p-2 rounded-lg">
          <LineChart labels={labels} data={data} />
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg flex-grow">
        <PieChart labels={labels} data={data} />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import config from "../config.ts";

interface DATAPROPERTY {
  valor_bienestar: number;
  comuna_id: number;
  nombre_comuna: string; // Agregar esta línea
}

export default function Ranking() {
  const [data, setData] = useState<DATAPROPERTY[]>([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/comunas/`)
      .then((response) => response.json())
      .then((json: DATAPROPERTY[]) => {
        const sortedData = json.sort(
          (a, b) => b.valor_bienestar - a.valor_bienestar
        );
        const top5Data = sortedData.slice(0, 5);
        setData(top5Data);
      });
  }, []);
  return (
    <div className="bg-white shadow-md rounded w-full ">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">Comuna</th>
            <th className="py-3 px-6 text-center">Valor bienestar</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light text-center">
          {data.map((item) => (
            <tr key={item.comuna_id} className="border-b border-gray-200">
              <td className="px-1 text-center">{item.nombre_comuna}</td>
              <td className="p-1 px-6 text-center">
                {(item.valor_bienestar * 100).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

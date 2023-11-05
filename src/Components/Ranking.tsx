// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

import { useEffect, useState } from "react";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const options = {
//   responsive: true,
//   animation: {
//     duration: 0,
//   },
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
//   scales: {
//     y: {
//       min: 0,
//     },
//     x: {
//       ticks: { color: "rgba(0, 220, 195)" },
//     },
//   },
// };

// interface BarChartProps {
//   labels: string[];
//   data: number[];
// }

// export default function BarChart({ labels, data }: BarChartProps) {
//   const dataCharts = {
//     labels,
//     datasets: [
//       {
//         data,
//         backgroundColor: "rgba(0, 220, 195, 0.5)",
//       },
//     ],
//   };

//   return <Bar data={dataCharts} options={options} />;
// }

export default function Ranking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/comunas/`)
      .then((response) => response.json())
      .then((json) => {
        // Ordenar los datos por valor_bienestar en orden descendente
        const sortedData = json.sort(
          (a, b) => b.valor_bienestar - a.valor_bienestar
        );

        // Tomar los primeros 5 elementos
        const top5Data = sortedData.slice(0, 5);

        setData(top5Data);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">CUT comuna</th>
            <th className="py-3 px-6 text-center">Puntuación</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light text-center">
          {data.map((item) => (
            <tr key={item.comuna_id}>
              <td>{item.comuna_id}</td>
              <td>{(item.valor_bienestar * 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

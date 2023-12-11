import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";

import config from "../config.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var options = {
  scales: {
    y: {
      ticks: { color: "rgba(54, 162, 235, 1)" },
    },
    x: {
      title: {
        display: true,
        text: "Numero de la Region ",
        color: "rgba(54, 162, 235, 1)",
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },
      ticks: { color: "rgba(54, 162, 235, 1)" },
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Distribución de la categoria en las Regiones",
      color: "rgba(54, 162, 235, 1)",
      font: {
        size: 18,
        weight: "bold" as const,
      },
    },
  },
};

interface LineChartProps {
  category: string;
}

interface DATAPROPERTY {
  valor: number;
  region_id: number;
}

export default function LineChart({ category }: LineChartProps) {
  const [data, setData] = useState<DATAPROPERTY[]>([]);

  useEffect(() => {
    fetch(`${config.apiUrl}/regiones/dimension/categoria/${category}`)
      .then((response) => response.json())
      .then((json: DATAPROPERTY[]) => {
        const sortedData = json.sort((a, b) => a.region_id - b.region_id);
        setData(sortedData);
      });
  }, [category]);

  const dataCharts = {
    labels: data.map((item) => item.region_id),
    datasets: [
      {
        label: `${category}`,
        data: data.map((item) => item.valor),
        tension: 0.5,
        fill: true,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        pointRadius: 5,
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return <Line data={dataCharts} options={options} />;
}

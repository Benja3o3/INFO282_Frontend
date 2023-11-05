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
      min: 0,
    },
    x: {
      ticks: { color: "rgb(255, 99, 132)" },
    },
  },
};

interface LineChartProps {
  category: string;
}

export default function LineChart({ category }: LineChartProps) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/regiones/dimension/categoria/${category}`)
      .then((response) => response.json())
      .then((json) => {
        // Ordenar los datos por valor_bienestar en orden descendente
        const sortedData = json.sort(
          (a, b) => b.valor_bienestar - a.valor_bienestar
        );
        setData(sortedData);
      });
  }, [category]);

  // Preparar los datos para el gráfico
  const dataCharts = {
    labels: data.map((item) => item.region_id),
    datasets: [
      {
        label: `${category}`,
        data: data.map((item) => item.valor),
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  return <Line data={dataCharts} options={options} />;
}

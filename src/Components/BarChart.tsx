import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

const options = {
  responsive: true,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
    },
    x: {
      ticks: { color: "rgba(0, 220, 195)" },
    },
  },
};

interface BarChartProps {
  cut: number;
}

export default function BarChart({ cut }: BarChartProps) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "rgba(0, 220, 195, 0.5)",
      },
    ],
  });

  useEffect(() => {
    fetch(`http://localhost:5002/dimension/${cut}`)
      .then((response) => response.json())
      .then((json) => {
        json.sort((a, b) => a.nombre.localeCompare(b.nombre));
        const labels = json.map((item) => item.nombre);
        const valores = json.map((item) => item.valor);

        setData({
          labels,
          datasets: [
            {
              data: valores,
              backgroundColor: "rgba(0, 220, 195, 0.5)",
            },
          ],
        });
      });
  }, [cut]);

  return <Bar data={data} options={options} />;
}

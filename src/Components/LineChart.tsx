import { useEffect, useState } from "react";
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
  cut: number;
}

export default function LineChart({ cut }: LineChartProps) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgba(255, 99, 132)",
        pointBackgroundColor: "rgba(255, 99, 132)",
      },
    ],
  });

  useEffect(() => {
    fetch(`http://localhost:5002/dimension/${cut}`)
      .then((response) => response.json())
      .then((json) => {
        // Transformar los datos JSON en el formato adecuado
        json.sort((a: { nombre: string }, b: { nombre: string }) => a.nombre.localeCompare(b.nombre));
        const labels = json.map((item: { nombre: string }) => item.nombre);
        const dataValues = json.map((item: { valor: number }) => item.valor);
        

        setChartData({
          labels,
          datasets: [
            {
              data: dataValues,
              tension: 0.5,
              fill: true,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              pointRadius: 5,
              pointBorderColor: "rgba(255, 99, 132)",
              pointBackgroundColor: "rgba(255, 99, 132)",
            },
          ],
        });
      });
  }, [cut]);

  return <Line data={chartData} options={options} />;
}

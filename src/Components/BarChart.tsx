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
  labels: string[];
  data: number[];
}

export default function BarChart({ labels, data }: BarChartProps) {
  const dataCharts = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: "rgba(0, 220, 195, 0.5)",
      },
    ],
  };

  return <Bar data={dataCharts} options={options} />;
}

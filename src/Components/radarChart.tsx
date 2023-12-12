import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

const options = {
  plugins: {
    title: {
      display: true,
      text: "Radar de Categorías",
      font: {
        size: 16,
      },
    },
  },
  elements: {
    line: {
      borderWidth: 1,
    },
  },
};

interface RadarChartProps {
  labels: string[];
  data: number[];
}

export default function RadarChart({ labels, data }: RadarChartProps) {
  const backgroundColor = "rgba(75, 192, 192, 0.6)";
  const borderColor = "rgba(75, 192, 192, 1)";

  const dataCharts = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Radar
      data={dataCharts}
      options={{
        ...options,
        plugins: { ...options.plugins, legend: { display: false } },
      }}
    />
  );
}

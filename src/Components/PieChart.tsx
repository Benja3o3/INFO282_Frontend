import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
  responsive: true,
  maintainAspectRatio: false,
};

interface PieChartProps {
  labels: string[];
  data: number[];
}

export default function PieChart({ labels, data }: PieChartProps) {
  const backgroundColors = [
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(201, 203, 207, 0.6)",
    "rgba(240, 128, 128, 0.6)",
  ];

  const borderColor = [
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 205, 86, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(201, 203, 207, 1)",
    "rgba(240, 128, 128, 1)",
  ];

  const dataCharts = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={dataCharts} options={options} />;
}

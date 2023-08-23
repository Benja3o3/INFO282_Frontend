import React from "react";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graphic() {
  const data1 = [2, 3, 4, 5, 4, 4, 5, 7];
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
  ];

  const data = {
    labels: meses,
    datasets: [
      {
        label: "Cantidad",
        data: data1,
      },
    ],
  };
  return (
    <div>
      <Line data={data}></Line>
    </div>
  );
}

export default Graphic;

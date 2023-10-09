import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
  responsive: true,
  maintainAspectRatio: false,
};

interface PieChartProps {
  cut: number;
}

export default function PieChart({ cut }: PieChartProps) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetch(`http://localhost:5002/dimension/${cut}`)
      .then((response) => response.json())
      .then((json) => {
        // Transformar los datos JSON en el formato adecuado
        json.sort((a, b) => a.nombre.localeCompare(b.nombre));
        const labels = json.map((item) => item.nombre);
        const dataValues = json.map((item) => item.valor);

        setData({
          labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      });
  }, [cut]);

  return <Pie data={data} options={options} />;
}

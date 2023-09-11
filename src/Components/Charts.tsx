import BarChart from "../components/BarChart.tsx";
import LineChart from "../components/LineChart.tsx";
import PieChart from "../components/PieChart.tsx";

import "tailwindcss/tailwind.css";

export default function Charts() {
  return (
    <div className="h-screen w-full rounded-lg grid place-content-center">
      <div className="grid gap-3">
        <div className="bg-white p-2 rounded-lg ">
          <BarChart />
        </div>
        <div className=" bg-white p-2 rounded-lg">
          <LineChart />
        </div>
        <div className=" bg-white p-2 rounded-lg ">
          <PieChart />
        </div>
      </div>
    </div>
  );
}

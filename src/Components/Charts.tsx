import BarChart from "./BarChart.tsx";
import LineChart from "./LineChart.tsx";
import PieChart from "./PieChart.tsx";

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

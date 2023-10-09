import BarChart from "./BarChart.tsx";
import LineChart from "./LineChart.tsx";
import PieChart from "./PieChart.tsx";

interface ChartProps {
  cut: number;
}
export default function Charts({ cut }: ChartProps) {
  return (
    <div className="p-2 h-screen flex flex-col">
      <h1 className="text-[2vw] font-semibold text-center">GRAFICOS</h1>

      <div className=" grid grid-rows-2 gap-3 mb-3">
        <div className=" bg-white p-2 rounded-lg">
          <BarChart cut={cut} />
        </div>
        <div className="bg-white p-2 rounded-lg">
          <LineChart cut={cut} />
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg flex-grow">
        <PieChart cut={cut} />
      </div>
    </div>
  );
}

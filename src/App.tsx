import Map from "./components/Map.tsx";
import Charts from "./components/Charts.tsx";
import IndicatorTable from "./components/IndicatorTable.tsx";

import "tailwindcss/tailwind.css";

export default function App() {
  return (
    <div className="w-full h-screen flex flex-cols text-center p-2">
      <div className="w-1/2 bg-slate-200 h-full mr-2 hidden md:flex flex-col rounded-lg">
        <h1 className="text-2xl font-roboto">BAROMETER COUNTRY</h1>
        <IndicatorTable />
      </div>
      <div className="w-1/2 bg-slate-200 h-full p-2 mr-2 hidden md:flex flex-col rounded-lg">
        <h1 className="text-2xl font-roboto">GRAPHICS</h1>
        <Charts />
      </div>
      <div className="grid grid-cols-1 gap-3 w-full mx-auto h-full">
        <Map />
      </div>
    </div>
  );
}

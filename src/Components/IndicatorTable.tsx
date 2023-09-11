import Indicator from "./Indicator";
import { INDICATOR_DATA } from "./constants.tsx";
import "tailwindcss/tailwind.css";

const onclick = (e) => {
  alert("Exportar datos en CSV o XML");
};

export default function IndicatorTable() {
  return (
    <div className="h-screen w-full rounded-lg grid">
      <div>
        {INDICATOR_DATA.map((data, index) => (
          <Indicator
            key={index}
            progress={data.progress}
            imageUrl={data.imageUrl}
          />
        ))}
      </div>
      <hr className="" />
      <div className="text-white place-items-center">
        <button
          onClick={onclick}
          className="bg-[#1aae9f] p-2 rounded-full w-1/2"
        >
          Export data
        </button>
      </div>
    </div>
  );
}

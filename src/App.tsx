import Map from "./Components/Map";
import Graphic from "./Components/Graphic";
import { IndicatorTable } from "./Components/IndicatorTable";
import "./App.css";

function App() {
  return (
    <div className="parent">
      <div className="info">
        <Graphic></Graphic>
        <IndicatorTable></IndicatorTable>
      </div>
      <div className="map">
        <Map></Map>
      </div>
    </div>
  );
}

export default App;

import Map from "./Components/Map";
import Graphic from "./Components/Graphic";
import "./App.css";

function App() {
  return (
    <div className="parent">
      <div className="info">
        <Graphic></Graphic>
      </div>
      <div className="map">
        <Map></Map>
      </div>
    </div>
  );
}

export default App;

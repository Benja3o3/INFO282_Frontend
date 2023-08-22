import React from "react";
import Map from "./Components/Map";
import "./App.css";

function App() {
  return (
    <div className="parent">
      <div className="info">INFO</div>
      <div className="map">
        <Map></Map>
      </div>
    </div>
  );
}

export default App;

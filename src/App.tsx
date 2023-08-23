import React from "react";
import Map from "./Components/Map";
import "./App.css";
import Graphic from "./Components/Graphic";
import Card from "./Components/Card";

function App() {
  return (
    <div className="parent">
      <div className="info">
        <Graphic></Graphic>
        <Card></Card>
      </div>
      <div className="map">
        <Map></Map>
      </div>
    </div>
  );
}

export default App;

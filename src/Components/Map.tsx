import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import chile from "./../assets/comunas.json";

import React from "react";

function Map() {
  const data1 = [2, 3, 4, 5, 4, 4, 5];
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
  ];

  console.log(chile);
  const highlightFeature = (e: any) => {
    const layer = e.target;
    layer.setStyle({
      fillColor: "blue",
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    });
  };

  const resetHighlight = (e: any) => {
    const layer = e.target;
    layer.setStyle({
      fillColor: "green",
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.5,
    });
  };

  const showPopup = (feature: any, layer: any) => {
    layer.bindPopup(`<div>${feature.properties.Comuna}</div>`);
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: (e: any) => {
        showPopup(feature, layer);
        console.log(feature);
      },
    });
  };
  return (
    <MapContainer
      center={[-39.808333, -73.241667]}
      zoom={9}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></TileLayer>
      <GeoJSON data={chile.features} onEachFeature={onEachFeature}></GeoJSON>
    </MapContainer>
  );
}

export default Map;

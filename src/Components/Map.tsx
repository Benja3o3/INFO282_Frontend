import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import pais from "../assets/chile.json";
import regiones from "../assets/regiones.json";
import comunas from "../assets/comunas.json";

const defaultStyle = {
  fillColor: "#ff7800", // Color original de relleno
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7,
};
const clickStyle = {
  fillColor: "red",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7,
};

export function Map() {
  const paisLayer = L.geoJSON(pais, { style: defaultStyle });
  const regionLayer = L.geoJSON(regiones, { style: defaultStyle });
  const comunaLayer = L.geoJSON(comunas, { style: defaultStyle });

  const [currentZoom, setCurrentZoom] = useState(4);
  const [selectPais, setSelectPais] = useState(null);
  const [selectRegion, setSelectRegion] = useState(regionLayer); // Cambio de nombre para mayor claridad
  const [selectComuna, setSelectComuna] = useState(comunaLayer);

  const zoomToLayerMap = {
    4: [
      paisLayer,
      L.latLngBounds(L.latLng(-10, -110.0), L.latLng(-60.0, -40.0)),
    ],
    6: [
      regionLayer,
      L.latLngBounds(L.latLng(-17, -65.0), L.latLng(-58.0, -77.0)),
    ],
    8: [
      comunaLayer,
      L.latLngBounds(L.latLng(-16, -65.0), L.latLng(-58.0, -78.0)),
    ],
  };

  useEffect(() => {
    const map = L.map("map", {
      minZoom: 4,
      maxZoom: 8,
      zoomSnap: 2,
      zoomDelta: 2,
      maxBounds: L.latLngBounds(L.latLng(-10, -110.0), L.latLng(-60.0, -40.0)),
    }).setView([-35.675147, -71.542969], 4);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      minZoom: 4,
    }).addTo(map);

    let currentLayer = paisLayer.addTo(map);

    map.on("zoomend", (e) => {
      const zoom = e.target.getZoom();
      setCurrentZoom(zoom);
      const [newLayer, maxBounds] = zoomToLayerMap[zoom];
      if (newLayer && currentLayer !== newLayer) {
        map.removeLayer(currentLayer);
        currentLayer = newLayer.addTo(map);
        map.setMaxBounds(maxBounds);
      }
    });

    var info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };

    info.update = function (props) {
      this._div.innerHTML =
        "<h4>Información</h4>" +
        (props ? "<b>" + props.name + "</b><br />" : "Click sobre el mapa");
    };

    info.addTo(map);

    const handleLayerClick = (e, property) => {
      const name = e.layer.feature.properties[property];
      console.log(name);
      info.update({ name: name });
      if (property === "COUNTRY") {
        if (selectPais) {
          selectPais.setStyle(defaultStyle);
        }
        e.layer.setStyle(clickStyle);
        setSelectPais(e.layer);
      } else if (property === "Region") {
        if (selectRegion) {
          selectRegion.setStyle(defaultStyle);
        }
        e.layer.setStyle(clickStyle);
        setSelectRegion(e.layer);
      } else if (property === "Comuna") {
        if (selectRegion) {
          selectComuna.setStyle(defaultStyle);
        }
        e.layer.setStyle(clickStyle);
        setSelectComuna(e.layer);
      }
    };

    paisLayer.on("click", (e) => handleLayerClick(e, "COUNTRY"));
    regionLayer.on("click", (e) => handleLayerClick(e, "Region"));
    comunaLayer.on("click", (e) => handleLayerClick(e, "Comuna"));

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="Map-container"></div>;
}

export default Map;

import { useState, useEffect } from "react";
import L, { Map as LeafletMap, GeoJSON, Control } from "leaflet";
import { SHAPE, defaultStyle, clickStyle } from "./constants";
import "leaflet/dist/leaflet.css";
import "tailwindcss/tailwind.css";



interface CustomControl extends Control {
  _div: HTMLElement;
  update: () => void;
}

export default function Map({ onNameMapChange }) {
  const [zoomCurrent, setZoomCurrent] = useState<number>(4);
  const [layer, setLayer] = useState<GeoJSON>(SHAPE[4][1]);
  const [mapInstance, setMapInstance] = useState<LeafletMap>();
  const [propName, setPropName] = useState("COUNTRY");
  const [infoInstance, setInfoInstance] = useState<
    CustomControl | null | undefined
  >(null);

  useEffect(() => {
    const map = L.map("map", {
      maxBoundsViscosity: 1.0,
      bounceAtZoomLimits: false,
      minZoom: 4,
      maxZoom: 8,
      zoomSnap: 2,
      zoomDelta: 2,
      zoomControl: false,
      maxBounds: L.latLngBounds(L.latLng(-20, -110.0), L.latLng(-55.0, -41.0)),
    }).setView([-35.675147, -100.542969], 4);

    L.control.zoom({ position: "topleft" }).addTo(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    var info = new L.Control() as CustomControl;

    info.onAdd = function () {
      this._div = L.DomUtil.create(
        "div",
        "info p-2 bg-white bg-opacity-80 shadow-md rounded-md"
      );
      this.update();
      return this._div;
    };

    info.update = function () {
      this._div.innerHTML = "<h4>Información</h4> <b> Chile </b><br />";
    };

    info.addTo(map);

    setInfoInstance(info);
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  const handleLayerClick = (e: any, prop: string) => {
    const name = e.layer.feature.properties[prop];

    if (e.layer) {
      layer.setStyle(defaultStyle);
    }
    e.layer.setStyle(clickStyle);

    if (infoInstance && mapInstance) {
      infoInstance.update = function () {
        this._div.innerHTML =
          "<h4>Información</h4>" + "<b>" + name + "</b><br/>";
      };

      infoInstance.addTo(mapInstance);
    }
    onNameMapChange(name);
  };

  useEffect(() => {
    if (mapInstance && layer) {
      const currentLayer = layer.addTo(mapInstance);

      mapInstance.on("zoomend", (e) => {
        const zoom = e.target.getZoom();
        if (zoom !== zoomCurrent) {
          mapInstance.removeLayer(currentLayer);
          const [prop, newLayer, newBounds] = SHAPE[zoom];
          setPropName(prop);

          newLayer.addTo(mapInstance);
          setLayer(newLayer);
          setZoomCurrent(zoom);
          mapInstance.setMaxBounds(newBounds);
        }
      });
    }
    layer.on("click", (e) => handleLayerClick(e, propName));
  }, [mapInstance, zoomCurrent]);

  return <div id="map" className="h-full w-full rounded-lg" />;
}

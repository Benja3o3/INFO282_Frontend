import { useState, useEffect } from "react";
import L, { Map as LeafletMap, GeoJSON } from "leaflet";
import { SHAPE, defaultStyle, clickStyle } from "./constants";
import "leaflet/dist/leaflet.css";
import "tailwindcss/tailwind.css";

export default function Map() {
  const [zoomCurrent, setZoomCurrent] = useState<number>(4);
  const [layer, setLayer] = useState<GeoJSON>(SHAPE[4][1]);
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);
  const [propName, setPropName] = useState("COUNTRY");

  useEffect(() => {
    // here the hook define all principal characteristic for the map, this is renderer only once
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

    L.control.zoom({ position: "topright" }).addTo(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

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
    console.log(name);
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

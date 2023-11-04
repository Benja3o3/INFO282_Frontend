import { useState, useEffect } from "react";
import L, { Map as LeafletMap, GeoJSON, Control } from "leaflet";
import { SHAPE } from "../constants/layers.constants";
import { COLOR_WELFARE } from "../constants/styles.constants";
import "leaflet/dist/leaflet.css";

interface CustomControl extends Control {
  _div: HTMLElement;
  update: () => void;
}

interface MapProps {
  onNameMapChange: (cut: number, type: string, bienestar: number) => void;
}

export default function Map({ onNameMapChange }: MapProps) {
  const [zoomCurrent, setZoomCurrent] = useState<number>(4);
  const [layer, setLayer] = useState<GeoJSON>(SHAPE[4][1]);
  const [mapInstance, setMapInstance] = useState<LeafletMap>();
  const [propName, setPropName] = useState("pais");
  const [infoInstance, setInfoInstance] = useState<CustomControl>(
    new L.Control() as CustomControl
  );
  const [bienestar, setBienestar] = useState(0);

  const [bienestarRegion, setBienestarRegion] = useState<any[]>();
  const [bienestarComuna, setBienestarComuna] = useState<any[]>();
  const [bienestarPais, setBienestarPais] = useState<any[]>();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5002/regiones/").then((response) =>
        response.json()
      ),
      fetch("http://localhost:5002/comunas/").then((response) =>
        response.json()
      ),
      fetch("http://localhost:5002/pais/").then((response) => response.json()),
    ]).then(([regionesData, comunasData, paisData]) => {
      setBienestarRegion(regionesData);
      setBienestarComuna(comunasData);
      setBienestarPais(paisData);
      setDataLoaded(true);
    });
  }, []);

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

    infoInstance.onAdd = function () {
      this._div = L.DomUtil.create(
        "div",
        "info p-2 bg-white bg-opacity-80 shadow-md rounded-md"
      );
      this.update();
      return this._div;
    };

    infoInstance.update = function () {
      this._div.innerHTML =
        "<h4>Información</h4> <b> Selecciona un punto en el mapa </b><br />";
    };

    infoInstance.addTo(map);

    setInfoInstance(infoInstance);
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  const handleLayerClick = (e: any, prop: string, bienestar: number) => {
    const value =
      {
        pais: "COUNTRY",
        regiones: "Region",
        comunas: "Comuna",
      }[prop] || "";

    const name = e.layer.feature.properties[value];
    const cut =
      prop === "comunas"
        ? e.layer.feature.properties.cod_comuna
        : prop === "regiones"
        ? e.layer.feature.properties.codregion
        : e.layer.feature.properties.COUNTRY;

    if (infoInstance && mapInstance) {
      infoInstance.update = function () {
        infoInstance._div.innerHTML =
          "<h4>Información</h4>" + "<b>" + name + "</b><br/>";
      };
      infoInstance.addTo(mapInstance);
    }
    onNameMapChange(cut, prop, bienestar);

    const buildURL = (tipo: string) => {
      return `http://localhost:5002/${tipo}/${prop === "pais" ? "" : cut}`;
    };
    fetch(buildURL(prop))
      .then((response) => response.json())
      .then((json) => setBienestar(json[0].valor_bienestar));
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

          infoInstance.update = function () {
            infoInstance._div.innerHTML =
              "<h4>Información</h4> <b> Selecciona un punto en el mapa </b><br />";
          };
          infoInstance.addTo(mapInstance);
        }
      });
    }
    layer.on("click", (e) => handleLayerClick(e, propName, bienestar));
  }, [mapInstance, zoomCurrent]);

  useEffect(() => {
    if (dataLoaded && bienestarPais && bienestarRegion && bienestarComuna) {
      layer.eachLayer((geojsonLayer: any) => {
        let bienestar = 0;
        if (propName == "regiones") {
          const id_region = geojsonLayer.feature.properties.codregion;
          const bienestarItem = bienestarRegion.find(
            (item: any) => item.region_id == id_region
          );
          bienestar = bienestarItem.valor_bienestar.toFixed(1) * 10;
        } else if (propName == "comunas") {
          const id_comuna = geojsonLayer.feature.properties.cod_comuna;
          const bienestarItem = bienestarComuna.find(
            (item: any) => item.comuna_id == id_comuna
          );
          if (bienestarItem) {
            bienestar = bienestarItem.valor_bienestar.toFixed(1) * 10;
          }
        } else if (propName == "pais") {
          bienestar = bienestarPais[0].valor_bienestar.toFixed(1) * 10;
        }
        geojsonLayer.setStyle({
          fillColor: COLOR_WELFARE[bienestar],
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        });
      });
    }
  }, [dataLoaded, layer]);

  return <div id="map" className="h-full w-full rounded-lg" />;
}

import { useState, useEffect } from "react";
import L, { Map as LeafletMap, GeoJSON, Control } from "leaflet";
import { SHAPE } from "../constants/layers.constants";
import { COLOR_WELFARE } from "../constants/styles.constants";
import "leaflet/dist/leaflet.css";
import config from "../config.ts";

interface CustomControl extends Control {
  _div: HTMLElement;
  update: () => void;
}

interface MapProps {
  onNameMapChange: (cut: number, type: string, bienestar: number) => void;
}

const handleMouseOver = (e: L.LeafletMouseEvent) => {
  const layer = e.target as L.GeoJSON;
  if (layer.feature && "properties" in layer.feature && layer.feature.properties.Comuna) {
    const nombreComuna = layer.feature.properties.Comuna;
    layer.bindTooltip(nombreComuna, { permanent: false, direction: "center" }).openTooltip();
  }
};

const handleMouseOut = (e: L.LeafletMouseEvent) => {
  const layer = e.target as L.GeoJSON;
  layer.closeTooltip();
};

export default function Map({ onNameMapChange }: MapProps) {
  const [zoomCurrent, setZoomCurrent] = useState<number>(4);
  const [layer, setLayer] = useState<GeoJSON>(SHAPE[4][1]);
  const [mapInstance, setMapInstance] = useState<LeafletMap>();
  const [propName, setPropName] = useState("pais");
  const [infoInstance, setInfoInstance] = useState<CustomControl>(
    new L.Control() as CustomControl
  );

  const [bienestarRegion, setBienestarRegion] = useState<any[]>();
  const [bienestarComuna, setBienestarComuna] = useState<any[]>();
  const [bienestarPais, setBienestarPais] = useState<any[]>();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${config.apiUrl}/regiones/`).then((response) => response.json()),
      fetch(`${config.apiUrl}/comunas/`).then((response) => response.json()),
      fetch(`${config.apiUrl}/pais/`).then((response) => response.json()),
    ]).then(([regionesData, comunasData, paisData]) => {
      setBienestarRegion(regionesData);
      setBienestarComuna(comunasData);
      setBienestarPais(paisData);
      setDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    const map: LeafletMap = L.map("map", {
      maxBoundsViscosity: 1.0,
      bounceAtZoomLimits: false,
      minZoom: 4,
      maxZoom: 10,
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
        "info p-2 bg-white bg-opacity-80 shadow-md rounded-md text-lg"
      );
      this.update();
      return this._div;
    };

    infoInstance.update = function () {
      this._div.innerHTML =
        "<h4>Información</h4> <b> Selecciona un punto en el mapa </b><br />";
    };

    // Definir los rangos y colores para la leyenda
    const legendColors = [
      "#FF0000",
      "#ffa21f",
      "#ffba5f",
      "#ede96e",
      "#a1cc47",
      "#7cc200",
    ];
    const legendLabels = [
      "[0.00-0.17[",
      "[0.17-0.33[",
      "[0.33-0.50[",
      "[0.50-0.67[",
      "[0.67-0.83[",
      "[0.83-1.00]",
    ];

    const CustomControl = L.Control.extend({
      options: {
        position: "bottomright", // posición
      },

      onAdd: function () {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = `<div class="text-center font-bold">Rangos<br></div>`;

        for (let i = 0; i < legendColors.length; i++) {
          div.innerHTML += `
          <div class="text-center pl-1 pr-1 rounded-sm" style="background:${legendColors[i]}">${legendLabels[i]}<br></div> 
        `;
        }

        return div;
      },
    });

    const legend = new CustomControl();

    infoInstance.addTo(map);
    legend.addTo(map);

    setInfoInstance(infoInstance);
    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  const handleLayerClick = (e: any, prop: string) => {
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

    if (e.layer) {
      layer.setStyle({ weight: 2, color: "white", dashArray: "3" });
    }
    e.layer.setStyle({
      weight: 2, // Ancho del borde
      dashArray: "3",
      color: "rgba(60, 162, 235, 1)", // Color del borde
    });

    if (infoInstance && mapInstance) {
      infoInstance.update = function () {
        infoInstance._div.innerHTML =
          "<h4>Información</h4>" + "<b>" + name + "</b><br/>";
      };
      infoInstance.addTo(mapInstance);
    }

    const buildURL = (tipo: string) => {
      return `${config.apiUrl}/${tipo}/${prop === "pais" ? "" : cut}`;
    };
    fetch(buildURL(prop))
      .then((response) => response.json())
      .then((json) => {
        const newBienestar = json[0].valor_bienestar;
        onNameMapChange(cut, prop, newBienestar);
      });
  };

  useEffect(() => {
    if (mapInstance) {
      const handleZoomEnd = () => {
        const zoom = mapInstance.getZoom();
        if (zoom !== zoomCurrent) {
          // Eliminar todas las etiquetas antes de cambiar la capa
          layer.eachLayer((layerItem) => {
            if (layerItem.closeTooltip) {
              layerItem.closeTooltip();
            }
          });
          
          setZoomCurrent(zoom);
        }
      };
      
      mapInstance.on('zoomend', handleZoomEnd);
  
      return () => {
        mapInstance.off('zoomend', handleZoomEnd);
      };
    }
  }, [mapInstance, zoomCurrent, layer]);

  useEffect(() => {
    
    if (mapInstance && layer) {

      
      
      const currentLayer = layer.addTo(mapInstance);
      mapInstance.on("zoomstart", () => {
        mapInstance.eachLayer((layer) => {
          if (layer instanceof L.GeoJSON) {
            layer.closeTooltip();
          }
        });
      });
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
          currentLayer.eachLayer((layer) => {
            if (layer.closeTooltip) {
              layer.closeTooltip();
            }
          });
          infoInstance.update = function () {
            infoInstance._div.innerHTML =
              "<h4>Información</h4> <b> Selecciona un punto en el mapa </b><br />";
          };
          infoInstance.addTo(mapInstance);
        }
      });
    }
    layer.on("click", (e) => handleLayerClick(e, propName));
  }, [mapInstance, zoomCurrent]);

  const getColor = (progress: number) => {
    const progressRanges = [0.0, 0.17, 0.33, 0.5, 0.67, 0.83, 1.0];
    let currentColor = COLOR_WELFARE[0]; // Color predeterminado

    for (let i = 0; i < progressRanges.length; i++) {
      if (progress >= progressRanges[i] && progress < progressRanges[i + 1]) {
        currentColor = COLOR_WELFARE[i];
        break;
      }
    }

    return currentColor;
  };

  useEffect(() => {
    if (dataLoaded && bienestarPais && bienestarRegion && bienestarComuna) {
      layer.eachLayer((geojsonLayer: any) => {
        geojsonLayer.on({
          mouseover: handleMouseOver,
          mouseout: handleMouseOut,
        });
        let bienestar = 0;
        if (propName == "regiones") {
          const id_region = geojsonLayer.feature.properties.codregion;
          const bienestarItem = bienestarRegion.find(
            (item: any) => item.region_id == id_region
          );
          bienestar = bienestarItem.valor_bienestar;
        } else if (propName == "comunas") {
          const id_comuna = geojsonLayer.feature.properties.cod_comuna;
          const bienestarItem = bienestarComuna.find(
            (item: any) => item.comuna_id == id_comuna
          );
          if (bienestarItem) {
            bienestar = bienestarItem.valor_bienestar;
            console.log(
              "Bienestar: " + bienestarItem.valor_bienestar.toFixed(3)
            );
          }
        } else if (propName == "pais") {
          bienestar = bienestarPais[0].valor_bienestar;
        }
        geojsonLayer.setStyle({
          fillColor: getColor(bienestar),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        });
      });
    }
  }, [dataLoaded, layer, mapInstance]);

  return <div id="map" className="h-full w-full rounded-lg" />;
}

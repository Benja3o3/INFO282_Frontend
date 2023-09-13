import L, { LatLngBoundsExpression, GeoJSON } from "leaflet";
import { FeatureCollection } from "geojson";
import country from "../data/country.json";
import regions from "../data/regions.json";
import communes from "../data/communes.json";
import seguridad from "../img/seguridad.png";
import educacional from "../img/educacional.png";
import salud from "../img/salud.png";
import tecnologico from "../img/tecnologico.png";
import socioEconomico from "../img/socioEconomico.png";
import ecologico from "../img/ecologico.png";
import movilidad from "../img/movilidad.png";

export const defaultStyle = {
  fillColor: "#ff7800", // Color original de relleno
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7,
};

export const clickStyle = {
  fillColor: "red",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.7,
};

interface Shape {
  [key: number]: [string, GeoJSON, LatLngBoundsExpression];
}

export const SHAPE: Shape = {
  4: [
    "COUNTRY",
    L.geoJSON(country as FeatureCollection).setStyle(defaultStyle),
    L.latLngBounds(L.latLng(-10, -110.0), L.latLng(-60.0, -40.0)),
  ],
  6: [
    "Region",
    L.geoJSON(regions as FeatureCollection).setStyle(defaultStyle),
    L.latLngBounds(L.latLng(-17, -65.0), L.latLng(-58.0, -77.0)),
  ],
  8: [
    "Comuna",
    L.geoJSON(communes as FeatureCollection).setStyle(defaultStyle),
    L.latLngBounds(L.latLng(-16, -65.0), L.latLng(-58.0, -78.0)),
  ],
};

interface ColorWelfare {
  [key: number]: string;
}

export const COLOR_WELFARE: ColorWelfare = {
  0: "#7cc200", // Verde
  20: "#a1cc47", // Verde claro
  40: "#ede96e", // Amarillo
  60: "#ffba5f", // Naranjo
  80: "#ffa21f", // Naranjo oscuro
  100: "#FF0000", // Rojo
};

export const INDICATOR_DATA = [
  {
    name: "Seguridad",
    progress: 50,
    imageUrl: seguridad,
  },
  {
    name: "Educacional",
    progress: 90,
    imageUrl: educacional,
  },
  {
    name: "Salud",
    progress: 50,
    imageUrl: salud,
  },
  {
    name: "Tecnologico",
    progress: 90,
    imageUrl: tecnologico,
  },
  {
    name: "SocioEconomico",
    progress: 20,
    imageUrl: socioEconomico,
  },
  {
    name: "Ecologico",
    progress: 78,
    imageUrl: ecologico,
  },
  {
    name: "Movilidad",
    progress: 10,
    imageUrl: movilidad,
  },
];

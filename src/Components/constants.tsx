import L, { LatLngBoundsExpression, GeoJSON } from "leaflet";
import { FeatureCollection } from "geojson";
import country from "../data/country.json";
import regions from "../data/regions.json";
import communes from "../data/communes.json";

interface Shape {
  [key: number]: [string, GeoJSON, LatLngBoundsExpression];
}

export const SHAPE: Shape = {
  4: [
    "COUNTRY",
    L.geoJSON(country as FeatureCollection),
    L.latLngBounds(L.latLng(-10, -110.0), L.latLng(-60.0, -40.0)),
  ],
  6: [
    "Region",
    L.geoJSON(regions as FeatureCollection),
    L.latLngBounds(L.latLng(-17, -65.0), L.latLng(-58.0, -77.0)),
  ],
  8: [
    "Comuna",
    L.geoJSON(communes as FeatureCollection),
    L.latLngBounds(L.latLng(-16, -65.0), L.latLng(-58.0, -78.0)),
  ],
};

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
    progress: 50,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/2997/2997051.png",
  },
  {
    progress: 90,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/898/898655.png",
  },
  {
    progress: 50,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/2997/2997051.png",
  },
  {
    progress: 90,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/898/898655.png",
  },
  {
    progress: 20,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/1320/1320521.png",
  },
  {
    progress: 78,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/2953/2953363.png",
  },
  {
    progress: 10,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/2953/2953363.png",
  },
  {
    progress: 10,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/2953/2953363.png",
  },
];

import L, { LatLngBoundsExpression, GeoJSON } from "leaflet";
import { defaultStyle } from "./styles.constants";
import { FeatureCollection } from "geojson";
import country from "../data/country.json";
import regions from "../data/regions.json";
import communes from "../data/communes.json";

interface Shape {
  [key: number]: [string, GeoJSON, LatLngBoundsExpression];
}

export let SHAPE: Shape = {
  4: [
    "pais",
    L.geoJSON(country as FeatureCollection).setStyle(defaultStyle),
    L.latLngBounds(L.latLng(-10, -110.0), L.latLng(-60.0, -40.0)),
  ],
  6: [
    "regiones",
    L.geoJSON(regions as FeatureCollection).setStyle(defaultStyle),
    L.latLngBounds(L.latLng(-17, -65.0), L.latLng(-58.0, -77.0)),
  ],
  8: [
    "comunas",
    L.geoJSON(communes as FeatureCollection).setStyle(defaultStyle),
    L.latLngBounds(L.latLng(-16, -65.0), L.latLng(-58.0, -78.0)),
  ],
};

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

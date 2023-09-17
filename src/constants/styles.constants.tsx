export const defaultStyle = {
  fillColor: "#ff7800",
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
  0: "#7cc200",
  20: "#a1cc47",
  40: "#ede96e",
  60: "#ffba5f",
  80: "#ffa21f",
  100: "#FF0000",
};

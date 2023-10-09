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
  0: "#FF0000",
  20: "#ffa21f",
  40: "#ffba5f",
  60: "#ede96e",
  80: "#a1cc47",
  100: "#7cc200",
};

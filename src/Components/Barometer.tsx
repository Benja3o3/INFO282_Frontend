import React from "react";

import { COLOR_WELFARETEST } from "../constants/styles.constants";

interface HalfCircleProps {
  radius: number;
  numberOfSections: number;
  value: number; // Nuevo prop para el valor (entre 0 y 1)
}

const Barometer: React.FC<HalfCircleProps> = ({
  radius,
  numberOfSections,
  value,
}) => {
  const anglePerSection = 180 / numberOfSections; // Ángulo de cada casilla

  const createSection = (index: number) => {
    const startAngle = index * anglePerSection; // Ángulo de inicio
    const endAngle = (index + 1) * anglePerSection; // Ángulo de finalización

    const startAngleRad = startAngle * (Math.PI / 180); // Convierte a radianes
    const endAngleRad = endAngle * (Math.PI / 180);

    const x1 = radius * Math.cos(startAngleRad);
    const y1 = radius * Math.sin(startAngleRad);
    const x2 = radius * Math.cos(endAngleRad);
    const y2 = radius * Math.sin(endAngleRad);

    const colorIndex = index * 20; // Indice del color según el ángulo
    const fillColor = COLOR_WELFARETEST[colorIndex];

    return (
      <path
        key={index}
        d={`M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
        fill={fillColor}
      />
    );
  };

  const sections = Array.from({ length: numberOfSections }, (_, index) =>
    createSection(index)
  );

  // Calcular el ángulo correspondiente al valor entre 0 y 1 (0 a 180 grados)
  const valueAngle = value * 180;
  const valueAngleRad = valueAngle * (Math.PI / 180);

  // Calcular las coordenadas del punto correspondiente al valor
  const valueX = radius * Math.cos(valueAngleRad);
  const valueY = radius * Math.sin(valueAngleRad);

  // Agregar una línea que marque el valor
  const lineColor = "black"; // Puedes cambiar el color
  const lineThickness = 3; // Puedes cambiar el grosor de la línea

  const valueLine = (
    <line
      x1={0}
      y1={0}
      x2={valueX}
      y2={valueY}
      stroke={lineColor}
      strokeWidth={lineThickness}
    />
  );

  return (
    <div className="rotate-180 p-2">
      <svg
        width={radius * 2}
        height={radius}
        viewBox={`-${radius} 0 ${radius * 2} ${radius}`}
      >
        {sections}
        {valueLine}
      </svg>
    </div>
  );
};

export default Barometer;

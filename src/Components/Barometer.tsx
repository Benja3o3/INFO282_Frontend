import React, { useState, useEffect } from "react";

import { COLOR_WELFARE } from "../constants/styles.constants";

interface HalfCircleProps {
  radius: number;
  numberOfSections: number;
  value: number;
}

const Barometer: React.FC<HalfCircleProps> = ({
  radius,
  numberOfSections,
  value,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const anglePerSection = 180 / numberOfSections;

  const createSection = (index: number) => {
    const startAngle = index * anglePerSection; // Ángulo de inicio
    const endAngle = (index + 1) * anglePerSection; // Ángulo de finalización

    const startAngleRad = startAngle * (Math.PI / 180); // Convierte a radianes
    const endAngleRad = endAngle * (Math.PI / 180);

    const x1 = radius * Math.cos(startAngleRad);
    const y1 = radius * Math.sin(startAngleRad);
    const x2 = radius * Math.cos(endAngleRad);
    const y2 = radius * Math.sin(endAngleRad);

    const colorIndex = index; // Indice del color según el ángulo
    const fillColor = COLOR_WELFARE[colorIndex];

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

  const valueAngle = currentValue * 180;
  const valueAngleRad = valueAngle * (Math.PI / 180);
  const valueX = radius * Math.cos(valueAngleRad) * 8.5;
  const valueY = radius * Math.sin(valueAngleRad) ;

  const lineColor = "black";
  const lineThickness = 3;

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

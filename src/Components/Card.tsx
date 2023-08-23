import React from "react";
import "./Card.css";

interface Variable {
  name: string;
  percentage: number;
}

interface CardProps {
  indicatorPercentage: number;
  variables: Variable[];
}

const Card: React.FC<CardProps> = () => {
  const variables = [
    { name: "variable 1", percentage: 25 },
    { name: "variable 2", percentage: 13 },
  ];
  return (
    <div className="card">
      <div className="indicator">
        <div className="large-text">{`Indicador General ${25}%`}</div>
      </div>
      <div className="variables">
        {variables.map((variable, index) => (
          <div className="variable" key={index}>
            <div className="small-text">{`--- ${variable.name} ${variable.percentage}%`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

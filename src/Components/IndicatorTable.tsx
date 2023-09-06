import React from "react";
import { Indicador } from "./Indicator"; // Asegúrate de ajustar la ruta a tu archivo de Indicador
import "./indicator.css";

export function IndicatorTable(props) {
  return (
    <div className="resumen-indicadores">
      <h3>Resumen de Indicadores</h3>
      <Indicador nombre="Indicador 1" valor={props.indicador1} />
      <Indicador nombre="Indicador 2" valor={props.indicador2} />
      <Indicador nombre="Indicador 3" valor={props.indicador3} />
      <Indicador nombre="Indicador 4" valor={props.indicador4} />
      <Indicador nombre="Indicador 5" valor={props.indicador5} />
      <Indicador nombre="Indicador 6" valor={props.indicador6} />
      <Indicador nombre="Indicador 7" valor={props.indicador7} />
      <Indicador nombre="Indicador 8" valor={props.indicador8} />
    </div>
  );
}

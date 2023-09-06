import React from "react";
import "./indicator.css";

export function Indicador(props) {
  const handleClick = () => {
    // Manejar el clic del indicador aquí, por ejemplo, puedes mostrar una alerta con el valor del indicador.
    alert(`Valor de ${props.nombre} `);
  };

  return (
    <>
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-img"
          onClick={handleClick}
          src={`https://unavatar.io/luffy`}
          alt="avatar"
        />
        <div className="tw-followCard-info">
          <button
            className="indicador-indv"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            {props.nombre} {props.valor}
          </button>
        </div>
      </header>
    </>
  );
}

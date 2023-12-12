import React, { useEffect, useState } from "react";
import MathFormula from "./MathFormula";

interface PopUpProps {
  name: String;
  data: any;
}
interface Indicador {
  nombre: string;
  prioridad: string;
  descripcion: string;
  fuente: string;
}
const PopUp: React.FC<PopUpProps> = ({data }) => {

  return (
    <>
        <div className=" flex flex-col overflow-auto h-screen flex flex-col relative   scrollbar-hide">
        {data.map((indicador: { indicadoresinfo_id: React.Key | null | undefined; nombre: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; prioridad: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; descripcion: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; fuente: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
          <div className=" " key={indicador.indicadoresinfo_id}>
            <div className=" bg-sectiontext ">
             <h3 className="text-centerfont-roboto  ml-5 mr-5" style={{ color: 'white' }}><strong>{indicador.nombre}</strong></h3>
            </div>
            <div className="ml-2">
            <p><strong>Prioridad:</strong></p>
            <p  className="text-sm overflow-hidden"   style={{ maxWidth: '300px', textOverflow: 'ellipsis', whiteSpace: 'nowrap',  textAlign: 'left'  }}>{indicador.prioridad}</p>
            <p><strong>Descripción:</strong></p>
            <p  className="text-sm overflow-hidden"   style={{ maxWidth: '300px', textOverflow: 'ellipsis', whiteSpace: 'nowrap',  textAlign: 'left'  }}> {indicador.descripcion}</p>
            <p><strong>Fuente:</strong> </p>
            <p className="text-sm overflow-hidden" style={{ maxWidth: '300px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
            <a href={indicador.fuente} target="_blank" rel="noopener noreferrer">
              {indicador.fuente}
            </a>
          </p>
          </div>

          </div>
        ))}
      </div>
    </>
  );
};

export default PopUp;

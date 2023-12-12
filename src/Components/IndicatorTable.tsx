import { useEffect, useState } from "react";
import Indicator from "./Indicator";
import { INDICATOR_DATA } from "../constants/indicators.constants";
import ExportDataButton from "./ExportDataButton.tsx";

import config from "../config.ts";
import PopUp from "./PopUp.tsx";

interface IndicadorTableProps {
  cut: number;
  type: string;
  onButtonCategoryChange: (categoryName: string) => void; // Add this prop
}

type Diccionario = {
  id: number;
  nombre: string;
  valor: number;
  comuna_id: number;
};

export default function IndicatorTable({
  cut,
  type,
  onButtonCategoryChange,
}: IndicadorTableProps) {
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);
  const [openIndicator, setOpenIndicator] = useState<string | null>(null);
  const [dataDicc, setDataDicc] = useState<Diccionario[]>([]);
  const [mostrarResumen, setMostrarResumen] = useState(true);
  const [_nombre, setNombre] = useState<string | "">("");
  const [_valores, setValores] = useState<number[] | null>(null);
  const [_indicadores, setIndicadores] = useState<any>(null);
  const [_ind, setInd] = useState<any>(null);

  useEffect(() => {
    const buildURL = (tipo: string) => {
      if (type != "pais") {
        return `${config.apiUrl}/${tipo}/dimension/${cut}`;
      }
      return `${config.apiUrl}/${tipo}/dimension/`;
    };

    fetch(buildURL(type))
      .then((response) => response.json())
      .then((json) => setDataDicc(json));
  }, [selectedIndicator, cut]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/indicadoresData/`);
        if (!response.ok) {
          throw new Error(`Error de red - ${response.status}`);
        }
        const data = await response.json();
        setIndicadores(data)

      } catch (error) {
        console.error('Error al obtener datos de la API:');
      }
    };

    fetchData();
  }, []); // Asegúrate de ajustar las dependencias según tus necesidades
  
  

  const onclick = (buttonName: string) => {
    setOpenIndicator((prevOpenIndicator) =>
      prevOpenIndicator === buttonName ? null : buttonName
    );

    setSelectedIndicator(buttonName);
    onButtonCategoryChange(buttonName);
  };
  
  const handleMostrarClick = (nombre: string, valores: any) => {
    setMostrarResumen(!mostrarResumen);
    setNombre(nombre)
    setValores(valores)
    const indicadoresFiltrados = _indicadores.filter((indicador: { dim_nombre: any; }) => indicador.dim_nombre === nombre);
    setInd(indicadoresFiltrados)
  };

  const handleCloseResume = () =>{
    setMostrarResumen(!mostrarResumen);
  };

  return (
<>
        <div className="">
        {mostrarResumen ? (
          <div className="h-screen flex flex-col shadow-md">
            <span className="text-center bg-sectiongrey font-roboto font-extrabold">
              Resumen Indicadores
            </span>
                            
                <ExportDataButton />
            <div className="justify-center h-screen w-80   overflow-auto relative  scrollbar-hide">

              <div className="">
                {INDICATOR_DATA.map((indicator) => {
                  const matchingData = dataDicc.find(
                    (dicc) => dicc.nombre === indicator.name
                  );
                  const progressValue = matchingData ? matchingData.valor : 0;
                  
                  return (
                    <Indicator
                      key={indicator.name}
                      name={indicator.name}
                      progress={progressValue}
                      imageUrl={indicator.imageUrl}
                      onClick={onclick}
                      type={type}
                      cut={cut}
                      isSelected={selectedIndicator === indicator.name}
                      isOpen={openIndicator === indicator.name}
                      onToggleOpen={() =>
                        setOpenIndicator((prevOpenIndicator) =>
                          prevOpenIndicator === indicator.name ? null : indicator.name
                        )
                      }
                      openResumeClick={(nombre: string, valores: any) => {
                        handleMostrarClick(nombre, valores);
                      }}
                      
                    />
                  );
                })}
              </div>



            </div>

            
          </div>
        ) : (
          <div className="h-screen flex flex-col shadow-md">
            <div className="flex items-center justify-between bg-sectiongrey">
            <span className="ml-16 text-center font-roboto font-extrabold">
                Informacion indicadores
              </span>
              <button className=" text-2xl"  onClick={handleCloseResume}>x</button>
            </div>
            <div className="justify-center h-screen w-80">
            <PopUp
              name={_nombre}
              data={_ind}
            />
            </div>
          </div>
        )}
      </div>


    </>
  );
}

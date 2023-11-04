import React from "react";
import MathFormula from "./MathFormula";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  name: String;
  data: any;
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, name, data }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-screen w-full">
      <div className="absolute inset-0 bg-black opacity-50 "></div>
      <div className="relative z-10 bg-white p-2 rounded-lg shadow-lg h-1/2 w-1/4 ">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center">
          <h1 className="text-[2vw] font-semibold  mb-0 mt-4">
            Informacion del indicador
          </h1>
          <h2 className="text-[1.5vw] font-semibold  mb-2 text-red-500">
            {name}
          </h2>
          <div className="m-2">
            <p>LISTA DE VARIABLES </p>
            {data.map((indicator) => (
              <ol key={indicator}>
                <ol>{indicator}</ol>
              </ol>
            ))}
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-[1.5vw] font-semibold">
            Fórmula de calculo de indicador
          </h2>
          <div className="text-2xl">
            <MathFormula latexString="f(i) = \frac{\alpha}{n} \sum_{i=1}^{n} D" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;

import React, { ReactNode } from "react";
import MathFormula from "./MathFormula";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 bg-white p-4 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-2xl">
          La fórmula CULIA:
          <div>
            <MathFormula latexString="f(i) = \frac{\alpha}{n} \sum_{i=1}^{n} D" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopUp;

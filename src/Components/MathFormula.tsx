import { useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathFormulaProps {
  latexString: string;
}


const MathFormula: React.FC<MathFormulaProps> = ({ latexString }) => {
  useEffect(() => {
    const mathFormulaElement = document.getElementById("math-formula");
    if (mathFormulaElement) {
      katex.render(latexString, mathFormulaElement, {
        throwOnError: false, // Evita errores en la renderización
      });
    }
  }, [latexString]);

  return (
    <div id="math-formula">
      {/* You can add any additional content or styling here */}
    </div>
  );
};


export default MathFormula;

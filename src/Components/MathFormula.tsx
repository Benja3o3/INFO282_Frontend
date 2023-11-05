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
        throwOnError: false,
      });
    }
  }, [latexString]);

  return <div id="math-formula"></div>;
};

export default MathFormula;

import React, { useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const MathFormula = ({ latexString }) => {
  useEffect(() => {
    katex.render(latexString, document.getElementById("math-formula"), {
      throwOnError: false, // Evita errores en la renderización
    });
  }, [latexString]);

  return <div id="math-formula" />;
};

export default MathFormula;

// import React, { useState } from "react";
import config from "../config.ts";
import communes from "../data/communes.json";

function ExportDataButton() {
  const onclickData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/comunasData/`);
      const content = await response.text();
      const data = JSON.parse(content);
      console.log(data);
      const downloadContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
${communes.features
  .map(
    (feature) =>
      `  <Placemark>
    <name>${feature.properties.Comuna}</name>
    <description><![CDATA[
      <h2>${feature.properties.Comuna}</h2>
      <p>Bienestar: ${
        data.find(
          (element: any) => element.cut == feature.properties.cod_comuna
        ).bienestar
      }</p>
      ${data
        .filter((element: any) => element.cut == feature.properties.cod_comuna)
        .map((e: any) => `<p>${e.indicador}: ${e.valor_indicador}</p>`)
        .join("\n      ")}
      <!-- Agrega más información según tus necesidades -->
    ]]></description>
    <Polygon>
      <extrude>1</extrude>
      <altitudeMode>relativeToGround</altitudeMode>
      <outerBoundaryIs>
        <LinearRing>
          <coordinates>
            ${feature.geometry.coordinates[0]
              .map((coord) => coord.join(","))
              .join("\n            ")}
          </coordinates>
        </LinearRing>
      </outerBoundaryIs>
    </Polygon>
  </Placemark>`
  )
  .join("\n")}
</Document>
</kml>
    `;
      const blob = new Blob([downloadContent], {
        type: "application/vnd.google-earth.kml+xml",
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "allData.kml";
      document.body.appendChild(a);
      a.click();

      // Eliminar el enlace del DOM después de descargar
      document.body.removeChild(a);

      // Liberar el objeto URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={onclickData}
      className=" rounded-md text-lg bg-blue-500 p-3"
    >
      Exportar Datos
    </button>
  );
}

export default ExportDataButton;

import React from "react";
import RFMetrics from "./RFMetrics";
import RFTable from "./RFTable";
import RFGraph from "./RFGraph";

function RFOutput({
  result,
  xColumn,
  yColumn,
  xValues,
  actualValues,
  overallAccuracy
}) {
  return (
    <div id="rf-output">
      <RFMetrics result={result} />

      <RFGraph
        predictions={result.predictions}
        xValues={xValues}
        actualValues={actualValues}
        xColumn={xColumn}
        yColumn={yColumn}
      />

      <RFTable predictions={result.predictions} />

      {/* ⭐ OVERALL ACCURACY CARD */}
      <div
        style={{
          marginTop: "25px",
          background: "linear-gradient(135deg, #0a3b2e, #145a3c)",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          border: "1px solid #16a34a"
        }}
      >
        🌲 Overall Random Forest Accuracy: {overallAccuracy ?? "Loading"}%
      </div>
    </div>
  );
}

export default RFOutput;
import React from "react";

function RFMetrics({ result }) {
  return (
    <div id="rf-metrics">
      <div className="rf-metric-card">
        <h4>MSE</h4>
        <span>{result.mse}</span>
      </div>

      <div className="rf-metric-card">
        <h4>R² Score</h4>
        <span>{result.r2}</span>
      </div>

      <div className="rf-metric-card">
        <h4>Accuracy</h4>
        <span>{result.accuracy}%</span>
      </div>
    </div>
  );
}

export default RFMetrics;
import React from "react";
import "../css/LROutput.css";

function LRMetrics({ x, y, predictions }) {

  if (!x || !y || !predictions) {
    return (
      <div className="equation">
        <div className="nodata">❌ No metrics available</div>
      </div>
    );
  }

  const n = y.length;

  // 🔹 Calculate metrics
  let mse = 0;
  let mae = 0;
  let meanY = y.reduce((a, b) => a + b, 0) / n;

  let ssTotal = 0;
  let ssResidual = 0;

  for (let i = 0; i < n; i++) {
    const error = y[i] - predictions[i];

    mse += error * error;
    mae += Math.abs(error);

    ssResidual += error * error;
    ssTotal += Math.pow(y[i] - meanY, 2);
  }

  mse = mse / n;
  mae = mae / n;
  const rmse = Math.sqrt(mse);

  const r2 = ssTotal === 0 ? 0 : 1 - (ssResidual / ssTotal);
let conclusion = "";
let color = "";

if (r2 >= 0.9) {
  conclusion = "Excellent Model Fit";
  color = "#22C55E"; // green
} else if (r2 >= 0.75) {
  conclusion = "Very Good Fit";
  color = "#4ADE80"; // light green
} else if (r2 >= 0.5) {
  conclusion = "Average Fit";
  color = "#FACC15"; // yellow
} else {
  conclusion = "Poor Model Fit";
  color = "#EF4444"; // red
}
  return (
    <div className="equation">

      {/* 🔴 ERRORS SECTION */}
      <div className="Opcontainer">

        <h3 className="op-heading">
          <i className="fa-solid fa-triangle-exclamation"></i> Error Metrics
        </h3>

        <div className="op-card">
          <i className="fa-solid fa-square-root-variable icon-success"></i>
          <div className="op-title">MSE</div>
          <div className="op-value">{mse.toFixed(4)}</div>
        </div>

        <div className="op-card">
          <i className="fa-solid fa-wave-square icon-success"></i>
          <div className="op-title">RMSE</div>
          <div className="op-value">{rmse.toFixed(4)}</div>
        </div>

        <div className="op-card">
          <i className="fa-solid fa-minus icon-success"></i>
          <div className="op-title">MAE</div>
          <div className="op-value">{mae.toFixed(4)}</div>
        </div>

      </div>

      {/* 🟢 ACCURACY SECTION */}
      <div className="Opcontainer">

  <h3 className="op-heading">
    <i className="fa-solid fa-bullseye"></i> Accuracy
  </h3>

  <div className="op-card">
    <i className="fa-solid fa-chart-line icon-success"></i>
    <div className="op-title">R² Score</div>
    <div className="op-value">{r2.toFixed(4)}</div>
  </div>

  <div className="op-card">
    <i className="fa-solid fa-lightbulb icon-success"></i>
    <div className="op-title">Model Insight</div>
    <div className="op-value" style={{ color: color }}>
      {conclusion}
    </div>
  </div>

</div>

    </div>
  );
}

export default LRMetrics;
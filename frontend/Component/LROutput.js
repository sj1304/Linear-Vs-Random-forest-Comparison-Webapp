import React from "react";
import '../css/LROutput.css';

function LROutput({ result }) {

  if (!result) {
    return (
      <div className="equation">
        <div className="nodata">❌ No output yet</div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="equation">
        <div className="nodata">❌ {result.error}</div>
      </div>
    );
  }

  return (
    <div className="equation">

      <div className="Opcontainer">

  {/* 🔥 Title inside container */}
  <h3 className="op-heading">
    <i className="fa-solid fa-chart-line"></i> Linear Regression Output
  </h3>

  <div className="op-card">
    <i className="fa-solid fa-chart-line icon-success"></i>
    <div className="op-title">Slope (m)</div>
    <div className="op-value">{result.slope.toFixed(4)}</div>
  </div>

  <div className="op-card">
    <i className="fa-solid fa-arrow-down icon-success"></i>
    <div className="op-title">Intercept (b)</div>
    <div className="op-value">{result.intercept.toFixed(4)}</div>
  </div>

  <div className="op-card">
    <i className="fa-solid fa-square-root-variable icon-success"></i>
    <div className="op-title">Equation</div>
    <div className="op-equation">
      y = {result.slope.toFixed(4)}x + {result.intercept.toFixed(4)}
    </div>
  </div>

</div>
    </div>
  );
}

export default LROutput;
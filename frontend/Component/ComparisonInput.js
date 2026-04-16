import React, { useState } from "react";
import "../css/Comparison.css";

function ComparisonInput({ onRun }) {
  const [x, setX] = useState("sepal_length");
  const [y, setY] = useState("petal_length");
  const [trees, setTrees] = useState(10);
  const [depth, setDepth] = useState(3);

  const cols = ["sepal_length", "sepal_width", "petal_length", "petal_width"];

  return (
    <div className="cmp-input-bar">
      <div className="cmp-input-group">
        <label>X COLUMN</label>
        <select value={x} onChange={(e) => setX(e.target.value)}>
          {cols.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="cmp-input-group">
        <label>Y COLUMN</label>
        <select value={y} onChange={(e) => setY(e.target.value)}>
          {cols.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="cmp-input-group">
        <label>TREES (RF)</label>
        <input type="number" value={trees} onChange={(e) => setTrees(e.target.value)} />
      </div>

      <div className="cmp-input-group">
        <label>DEPTH (RF)</label>
        <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} />
      </div>

      <button className="cmp-run-btn" onClick={() => onRun({ x, y, trees, depth })}>
        Start Comparison ⚡
      </button>
    </div>
  );
}

export default ComparisonInput;
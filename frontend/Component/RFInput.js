import React, { useState } from "react";
import "../css/RandomForest.css";

function RFInput({ onSubmit }) {
  const [xColumn, setXColumn] = useState("sepal_length");
  const [yColumn, setYColumn] = useState("petal_length");
  const [trees, setTrees] = useState(10);
  const [depth, setDepth] = useState(3);

  const handleSubmit = () => {
    onSubmit({ xColumn, yColumn, trees, depth });
  };

  return (
    <div id="rf-input">
       <div id="rf-info">
        <div className="rf-item">
          <h3>
            🌲 Random Forest
          </h3>
          <p>Ensemble of Decision Trees</p>
          <p>Builds multiple trees using random samples</p>
          <p>Final output = average of all trees</p>
        </div>

        <div className="rf-item">
          <h3>
            ⚙️ Working
          </h3>
          <p>Bootstrap Sampling (Random Data)</p>
          <p>Feature Randomness</p>
          <p>Reduces Overfitting</p>
        </div>

        <div className="rf-item">
          <h3>
            📊 Metrics
          </h3>
          <p>MSE = (1/n) Σ(y − ŷ)²</p>
          <p>R² Score</p>
          <p>Accuracy ≈ R² × 100</p>
        </div>
      </div>

      <div id="rf-columns">
        <label>X Column</label>
        <select onChange={(e) => setXColumn(e.target.value)}>
          <option>sepal_length</option>
          <option>sepal_width</option>
          <option>petal_length</option>
          <option>petal_width</option>
        </select>
        <label>Y Column</label>
        <select onChange={(e) => setYColumn(e.target.value)}>
          <option>petal_length</option>
          <option>sepal_length</option>
          <option>sepal_width</option>
          <option>petal_width</option>
        </select>

        
       

        <label>Trees</label>
        <input
          type="number"
          value={trees}
          onChange={(e) => setTrees(e.target.value)}
        />

        <label>Depth</label>
        <input
          type="number"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
        />
      </div>

      <div className="rf-submit-btn">
        <button onClick={handleSubmit}>🌲 Run Random Forest</button>
      </div>
    </div>
  );
}

export default RFInput;
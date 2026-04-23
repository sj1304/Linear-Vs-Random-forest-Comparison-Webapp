import React from "react";
import "../../css/ConfusionMatrix.css";

const labels = ["Setosa", "Versicolor", "Virginica"];

function ConfusionMatrix({ matrix, model }) {
  if (!matrix) return null;

  const maxVal = Math.max(...matrix.flat());

  return (
    <div className="cm-card">
      <h3 className="cm-title">{model}</h3>

      <div className="matrix">
        {matrix.map((row, i) => (
          <div className="row" key={i}>
            {row.map((val, j) => {
              const intensity = val / maxVal;

              return (
                <div
                  className="cell"
                  key={j}
                  style={{
                    backgroundColor: `rgba(0, 123, 255, ${intensity})`,
                    color: intensity > 0.5 ? "white" : "black"
                  }}
                  title={`Actual: ${labels[i]} 
Predicted: ${labels[j]} 
Count: ${val}`}
                >
                  {val}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="cm-info">
        Rows = Actual | Columns = Predicted
      </p>
    </div>
  );
}

export default ConfusionMatrix;
import React from "react";
import "../../css/PredictionCards.css";

function PredictionCards({ predictions }) {
  if (!predictions) return null;

  return (
    <div className="cards-container">
      {Object.entries(predictions).map(([model, value], index) => {
        
        // Capitalize species
        const species = "Iris " + value.charAt(0).toUpperCase() + value.slice(1);

        // Color logic
        let textClass = "purple";
        if (value === "setosa") textClass = "green";

        return (
          <div className="card" key={index}>
            <h3 className="model-name">{model}</h3>
            <p className={`species ${textClass}`}>{species}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PredictionCards;
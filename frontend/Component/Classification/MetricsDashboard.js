import React, { useEffect, useState } from "react";
import "../../css/MetricsDashboard.css";

function MetricsDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/metrics")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.log(err));
  }, []);

  if (!metrics) return null;

  return (
    <div className="metrics-container">
      {Object.entries(metrics).map(([model, values], index) => (
        <div className="metrics-card" key={index}>
          <h3>{model}</h3>

          <p>Accuracy: <span>{values.accuracy}</span></p>
          <p>Precision: <span>{values.precision}</span></p>
          <p>Recall: <span>{values.recall}</span></p>
          <p>F1 Score: <span>{values.f1_score}</span></p>
        </div>
      ))}
    </div>
  );
}

export default MetricsDashboard;
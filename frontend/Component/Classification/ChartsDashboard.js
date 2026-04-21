import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
  LineChart, Line
} from "recharts";

import ConfusionMatrix from "./ConfusionMatrix";
import Summary from "./Summary";
import "../../css/ChartsDashboard.css";

function ChartsDashboard() {
  const [data, setData] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/metrics")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  if (!data) return null;

  const COLORS = {
    LR: "#007bff",
    KNN: "#28a745",
    RF: "#6f42c1"
  };

  const getChartData = (metric) => [
    { model: "LR", value: data["Logistic Regression"][metric] },
    { model: "KNN", value: data["KNN"][metric] },
    { model: "RF", value: data["Random Forest"][metric] }
  ];

  const getROCData = (modelName) => {
    const roc = data[modelName].roc;
    if (!roc || !roc.fpr) return [];

    const result = [];

    Object.keys(roc.fpr).forEach((cls) => {
      const fpr = roc.fpr[cls];
      const tpr = roc.tpr[cls];

      for (let i = 0; i < fpr.length; i++) {
        result.push({
          fpr: fpr[i],
          tpr: tpr[i]
        });
      }
    });

    return result;
  };

  return (
    <div className="charts-container">

      {/* ================= CHARTS ================= */}
      <h2 className="section-title">📊 Model Performance</h2>

      <div className="charts-grid">
        {["accuracy", "precision", "recall", "f1_score"].map((metric) => (
          <div className="chart-card" key={metric}>
            <h3>{metric.toUpperCase()}</h3>

            <BarChart width={400} height={250} data={getChartData(metric)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip formatter={(v) => [`${v}`, metric]} />

              <Bar dataKey="value">
                {getChartData(metric).map((entry, i) => (
                  <Cell key={i} fill={COLORS[entry.model]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        ))}
      </div>

      {/* ================= CONFUSION ================= */}
      <h2 className="section-title">📊 Confusion Matrix</h2>

      <div className="cm-container">
        {Object.entries(data).map(([model, val]) => (
          <ConfusionMatrix
            key={model}
            model={
              model === "Logistic Regression"
                ? "LR"
                : model === "Random Forest"
                ? "RF"
                : "KNN"
            }
            matrix={val.confusion_matrix}
          />
        ))}
      </div>

      {/* ================= ROC ================= */}
      <h2 className="section-title">📈 ROC Curve</h2>

      <div className="charts-grid">
        {Object.keys(data).map((model) => (
          <div className="chart-card" key={model}>
            <h3>
              {model === "Logistic Regression"
                ? "LR"
                : model === "Random Forest"
                ? "RF"
                : "KNN"}
            </h3>

            <LineChart width={400} height={250} data={getROCData(model)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fpr" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tpr" stroke="#007bff" dot={false} />
            </LineChart>
          </div>
        ))}
      </div>

      {/* ================= BUTTON ================= */}
      <div className="analysis-btn-container">
        <button
          className="analysis-btn"
          onClick={() => setShowSummary(true)}
        >
          Get Classification Analysis
        </button>
      </div>

      {/* ================= SUMMARY ================= */}
      {showSummary && <Summary data={data} />}

    </div>
  );
}

export default ChartsDashboard;
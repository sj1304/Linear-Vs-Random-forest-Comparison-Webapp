import React from "react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from "recharts";
import "../css/Comparison.css";

function AccuracyComparison({ lrM, rfM }) {
  const lrAcc = Math.max(0, (lrM.r2 * 100)).toFixed(2);
  const rfAcc = Math.max(0, (rfM.r2 * 100)).toFixed(2);

  const data = [
    { name: "Random Forest", value: parseFloat(rfAcc), fill: "#22c55e" },
    { name: "Linear Regression", value: parseFloat(lrAcc), fill: "#a855f7" },
  ];

  return (
    <div className="cmp-section">
      <h2 className="section-title">🎯 Accuracy Comparison (R² Score)</h2>
      <div className="chart-row">
        <ResponsiveContainer width="50%" height={300}>
          <RadialBarChart
            innerRadius="30%"
            outerRadius="90%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background={{ fill: "#1e293b" }}
              dataKey="value"
              cornerRadius={6}
            />
            <Legend
              iconSize={12}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ color: "#cbd5e1" }}
            />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#fff" }}
              formatter={(v) => [`${v}%`, "R² Accuracy"]}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="metric-cards-col">
          <div className="metric-big lr-metric">
            <span className="metric-label">📈 Linear Regression</span>
            <span className="metric-val lr-val">R² = {lrM.r2.toFixed(4)}</span>
            <span className="metric-acc">{lrAcc}%</span>
          </div>
          <div className="metric-big rf-metric">
            <span className="metric-label">🌲 Random Forest</span>
            <span className="metric-val rf-val">R² = {rfM.r2.toFixed(4)}</span>
            <span className="metric-acc">{rfAcc}%</span>
          </div>
          <div className="metric-verdict">
            {parseFloat(rfAcc) >= parseFloat(lrAcc)
              ? "🌲 Random Forest has higher R²"
              : "📈 Linear Regression has higher R²"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccuracyComparison;
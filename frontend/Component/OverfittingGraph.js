import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../css/Comparison.css";

function OverfittingGraph({ lrM, rfM }) {
  // RF typically overfits more (train >> test), LR is more stable
  // We simulate test Rsq as slightly lower than train Rsq
  const data = [
    {
      name: "Linear Reg",
      "Train R²": parseFloat(lrM.r2.toFixed(3)),
      "Test R² (est)": parseFloat((lrM.r2 * 0.93).toFixed(3)),
    },
    {
      name: "Random Forest",
      "Train R²": parseFloat(rfM.r2.toFixed(3)),
      "Test R² (est)": parseFloat((rfM.r2 * 0.82).toFixed(3)),
    },
  ];

  return (
    <div className="cmp-section">
      <h2 className="section-title">⚠️ Overfitting (Train vs Test R²)</h2>
      <p className="section-note">Test R² is estimated at ~93% of train for LR and ~82% for RF (typical overfitting tendency)</p>
      <ResponsiveContainer width="70%" height={300}>
        <BarChart data={data} barGap={8} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" tick={{ fill: "#94a3b8" }} />
          <YAxis domain={[0, 1]} tick={{ fill: "#94a3b8" }} />
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#fff" }} />
          <Legend wrapperStyle={{ color: "#cbd5e1" }} />
          <Bar dataKey="Train R²" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Test R² (est)" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OverfittingGraph;
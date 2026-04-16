import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "../css/Comparison.css";

function ComparisonGraph({ lr, rf }) {
  const points = 40;

  const data = lr.x.slice(0, points).map((x, i) => ({
    x: parseFloat(x.toFixed(2)),
    "Actual": parseFloat(lr.y[i].toFixed(3)),
    "LR Predicted": parseFloat(lr.predictions[i].toFixed(3)),
    "RF Predicted": parseFloat(rf.predictions[i].toFixed(3)),
  }));

  return (
    <div className="cmp-section">
      <h2 className="section-title">📈 Predictions vs Actual (First 40 Points)</h2>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="x" tick={{ fill: "#94a3b8", fontSize: 11 }} label={{ value: "X", position: "insideBottom", offset: -2, fill: "#94a3b8" }} />
          <YAxis tick={{ fill: "#94a3b8" }} />
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#fff" }} />
          <Legend wrapperStyle={{ color: "#cbd5e1" }} />
          <Line type="monotone" dataKey="Actual" stroke="#60a5fa" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="LR Predicted" stroke="#a855f7" strokeWidth={2} dot={false} strokeDasharray="5 3" />
          <Line type="monotone" dataKey="RF Predicted" stroke="#22c55e" strokeWidth={2} dot={false} strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ComparisonGraph;
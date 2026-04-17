import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "../css/Comparison.css";

function MSEComparison({ lrM, rfM }) {
  const data = [
    { name: "Linear Regression", value: parseFloat(lrM.mse.toFixed(4)) },
    { name: "Random Forest", value: parseFloat(rfM.mse.toFixed(4)) },
  ];
  const winner = lrM.mse <= rfM.mse ? "📈 Linear Regression" : "🌲 Random Forest";

  return (
    <div className="cmp-section">
      <h2 className="section-title">📊 MSE — Mean Square Error <span className="lower-better">(Lower = Better)</span></h2>
      <div className="chart-row">
        <ResponsiveContainer width="60%" height={260}>
          <BarChart data={data} barSize={55}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#fff" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              <Cell fill="#a855f7" />
              <Cell fill="#22c55e" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="metric-cards-col">
          <div className="metric-big lr-metric">
            <span className="metric-label">📈 LR — MSE</span>
            <span className="metric-val lr-val">{lrM.mse.toFixed(4)}</span>
          </div>
          <div className="metric-big rf-metric">
            <span className="metric-label">🌲 RF — MSE</span>
            <span className="metric-val rf-val">{rfM.mse.toFixed(4)}</span>
          </div>
          <div className="metric-verdict">{winner} wins (lower MSE)</div>
        </div>
      </div>
    </div>
  );
}

export default MSEComparison;
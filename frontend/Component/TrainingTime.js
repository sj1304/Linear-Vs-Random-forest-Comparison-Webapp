import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "../css/Comparison.css";

function TrainingTime({ lrTime, rfTime }) {
  const data = [
    { name: "Linear Regression", time: lrTime },
    { name: "Random Forest", time: rfTime },
  ];

  return (
    <div className="cmp-section">
      <h2 className="section-title">⏱ Training Time (ms)</h2>
      <div className="chart-row">
        <ResponsiveContainer width="60%" height={280}>
          <BarChart data={data} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 13 }} />
            <YAxis tick={{ fill: "#94a3b8" }} unit="ms" />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#fff" }}
              formatter={(v) => [`${v} ms`, "Time"]}
            />
            <Bar dataKey="time" radius={[6, 6, 0, 0]}>
              <Cell fill="#a855f7" />
              <Cell fill="#22c55e" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="time-cards">
          <div className="time-card lr-time">
            <span>📈 Linear Regression</span>
            <strong>{lrTime} ms</strong>
          </div>
          <div className="time-card rf-time">
            <span>🌲 Random Forest</span>
            <strong>{rfTime} ms</strong>
          </div>
          <div className="time-verdict">
            {lrTime < rfTime
              ? "⚡ Linear Regression is faster"
              : "⚡ Random Forest is faster"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingTime;
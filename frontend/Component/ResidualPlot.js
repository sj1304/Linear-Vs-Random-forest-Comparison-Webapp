import React from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine
} from "recharts";
import "../css/Comparison.css";

function ResidualPlot({ lr, rf }) {
  const lrResiduals = lr.x.map((x, i) => ({
    x: parseFloat(x.toFixed(2)),
    residual: parseFloat((lr.y[i] - lr.predictions[i]).toFixed(4)),
  }));

  const rfResiduals = rf.x.map((x, i) => ({
    x: parseFloat(x.toFixed(2)),
    residual: parseFloat((rf.y[i] - rf.predictions[i]).toFixed(4)),
  }));

  return (
    <div className="cmp-section">
      <h2 className="section-title">🔵 Residual Plot</h2>
      <p className="section-note">Points closer to y=0 indicate better predictions</p>

      <div className="residual-row">
        <div className="residual-half">
          <h4 className="res-sub lr-sub">📈 Linear Regression Residuals</h4>
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="x" tick={{ fill: "#94a3b8", fontSize: 11 }} name="X" />
              <YAxis dataKey="residual" tick={{ fill: "#94a3b8" }} name="Residual" />
              <ReferenceLine y={0} stroke="#ffffff33" strokeDasharray="4 4" />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#fff" }}
                cursor={{ strokeDasharray: "3 3" }}
              />
              <Scatter data={lrResiduals} fill="#a855f7" opacity={0.75} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="residual-half">
          <h4 className="res-sub rf-sub">🌲 Random Forest Residuals</h4>
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="x" tick={{ fill: "#94a3b8", fontSize: 11 }} name="X" />
              <YAxis dataKey="residual" tick={{ fill: "#94a3b8" }} name="Residual" />
              <ReferenceLine y={0} stroke="#ffffff33" strokeDasharray="4 4" />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#fff" }}
                cursor={{ strokeDasharray: "3 3" }}
              />
              <Scatter data={rfResiduals} fill="#22c55e" opacity={0.75} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ResidualPlot;
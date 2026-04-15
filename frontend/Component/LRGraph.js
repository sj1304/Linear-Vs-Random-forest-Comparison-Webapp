import React from "react";
import { Legend } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import "../css/LRGraph.css";

function LRGraph({ x, y, predictions, line_x, line_y }) {

  if (!x || !y || !predictions) {
    return <div className="no-graph">❌ No graph data</div>;
  }

  // 🔹 Base data (needed for axes)
  const baseData = x.map((val, i) => ({
    x: val
  }));

  // 🔴 Residual lines
  const residualLines = x.map((val, i) => ([
    { x: val, y: y[i] },              // actual
    { x: val, y: predictions[i] }     // predicted
  ]));

  // 🟣 Regression line (2-point perfect)
  const lineData = (line_x && line_y)
    ? line_x.map((val, i) => ({
        x: val,
        y: line_y[i]
      }))
    : [];

  return (
    <div className="graph-container">

      <h3 className="graph-heading">
        <i className="fa-solid fa-chart-line"></i> Simple Linear Regression
      </h3>

      <ResponsiveContainer width="100%" height={420}>
  <LineChart data={baseData}>

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="x" type="number" />
    <YAxis />

    <Tooltip />
    <Legend 
  verticalAlign="bottom"
  align="center"
  iconType="line"
  wrapperStyle={{
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "10px",
    color: "#DDD6FE",
    fontSize: "20px"
  }}
/>

    {/* 🟣 Regression Line */}
    <Line
      data={lineData}
      type="linear"
      dataKey="y"
      stroke="#ac68f4"
      strokeWidth={4}
      dot={false}
      name="Regression Line"
    />

    {/* 🔴 Dummy line for legend */}
    <Line
      type="linear"
      dataKey="y"
      stroke="#F87171"
      strokeWidth={2}
      dot={false}
      name="Residual Error"
      legendType="line"
    />

    {/* 🔴 Actual residual lines */}
    {residualLines.map((line, index) => (
      <Line
      
        key={index}
        data={line}
        type="linear"
        dataKey="y"
        stroke="#F87171"
        strokeWidth={2}
        dot={false}
        isAnimationActive={false}
        legendType="none"
      />
    ))}

  </LineChart>
</ResponsiveContainer>

    </div>
  );
}

export default LRGraph;
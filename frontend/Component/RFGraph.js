import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function RFGraph(props) {
  const {
    predictions = [],
    xValues = [],
    actualValues = [],
    xColumn = "X",
    yColumn = "Y"
  } = props;

  // ✅ SAFETY CHECK (prevents crash)
  if (!predictions.length || !xValues.length || !actualValues.length) {
    return <p style={{ color: "white" }}>Loading graph...</p>;
  }

  const graphData = xValues.slice(0, 30).map((x, index) => ({
    x,
    actual: actualValues[index],
    predicted: predictions[index]
  }));

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Random Forest Prediction Graph</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" label={{ value: xColumn, position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: yColumn, angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#2563eb"
            strokeWidth={3}
            name={`Actual ${yColumn}`}
          />

          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#16a34a"
            strokeWidth={3}
            name={`Predicted ${yColumn}`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RFGraph;
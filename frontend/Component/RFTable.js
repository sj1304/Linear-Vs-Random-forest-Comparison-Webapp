import React from "react";

function RFTable({ predictions }) {
  return (
    <table className="rf-confusion-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>Prediction</th>
        </tr>
      </thead>
      <tbody>
        {predictions.slice(0, 10).map((val, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{val.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RFTable;
import React from "react";
import "../css/LRTable.css";

function LRTable({ x, y, predictions }) {

  if (!x || !y || !predictions) {
    return <div className="no-table-data">❌ No table data</div>;
  }

  return (
    <div className="table-container">

      <h3 className="table-heading">
        <i className="fa-solid fa-table"></i> Data Table
      </h3>

      <table border={1} className="lr-table">
        <thead>
          <tr>
            <th>X</th>
            <th>Actual Y</th>
            <th>Predicted Y</th>
          </tr>
        </thead>

        <tbody>
          {x.slice(0, 6).map((val, i) => (
            <tr key={i}>
              <td>{val}</td>
              <td>{y[i]}</td>
              <td>{predictions[i].toFixed(3)}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default LRTable;
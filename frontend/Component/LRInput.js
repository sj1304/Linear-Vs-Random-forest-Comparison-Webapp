import "../css/LRInput.css";
import { useIrisData } from "../Components/Iris"; // Make sure the path is correct
import { useState, useEffect } from "react";

function LRInput({ onColumnsSelect }) { // <-- accept a callback prop
  const irisData = useIrisData(); // Fetch data
  const [columns, setColumns] = useState([]);
  const [xColumn, setXColumn] = useState("");
  const [yColumn, setYColumn] = useState("");

  // Extract column names once data is available
  useEffect(() => {
    if (irisData.length > 0) {
      setColumns(Object.keys(irisData[0]));
    }
  }, [irisData]);

  const handleSubmit = () => {
    if (xColumn && yColumn) {
      // Call the parent or any function with the selected columns
      onColumnsSelect({ x: xColumn, y: yColumn });
    } else {
      alert("Please select both X and Y columns");
    }
  };

  return (
    <>
      <div id="input">
        <div id="formulas">
          
          <div className="items">
            
            <h3>
              
              <i className="fa-solid fa-chart-line icon-green"></i> Simple Linear Regression
            </h3>
            <p>ŷ = b0 + b1x</p>
            <p>
              b1 = [nΣxy − (Σx)(Σy)] / [nΣx<sup>2</sup> − (Σx)<sup>2</sup>]
            </p>
            <p>b0 = ȳ − b1x̄</p>
          </div>

          <div className="items">
            <h3>
              <i className="fa-solid fa-triangle-exclamation icon-red"></i> Error Metrics
            </h3>
            <p>e = y − ŷ</p>
            <p>MSE = (1/n) Σ(y − ŷ)²</p>
            <p>RMSE = √[ (1/n) Σ (y − ŷ)² ]</p>
            <p>MAE = (1/n) Σ | y − ŷ |</p>
          </div>

          <div className="items">
            <h3>
              <i className="fa-solid fa-chart-column icon-purple"></i> Accuracy
            </h3>
            <p>R² = 1 − (SS_res / SS_tot)</p>
            <p>SS_res = Σ(y − ŷ)²</p>
            <p>SS_tot = Σ(y − ȳ)²</p>
          </div>
        </div>

        <div id="data_columns">
          <div id="columnsTitle">Columns To Compare:</div>

         {/* X Column Select */}
<select value={xColumn} onChange={(e) => setXColumn(e.target.value)}>
  <option value="">Select X Column</option>
  {columns
    .filter((col) => col !== "species")
    .map((col) => (
      <option key={col} value={col}>
        {col}
      </option>
    ))}
</select>

{/* Y Column Select */}
<select value={yColumn} onChange={(e) => setYColumn(e.target.value)}>
  <option value="">Select Y Column</option>
  {columns
    .filter((col) => col !== "species")
    .map((col) => (
      <option key={col} value={col}>
        {col}
      </option>
    ))}
</select>
        </div>

        <div className="SubmitBtn">
          <button onClick={handleSubmit}>
            Run Linear Regression
          </button>
        </div>
      </div>
    </>
  );
}

export default LRInput;

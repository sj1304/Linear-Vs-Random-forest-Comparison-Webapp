import LRInput from "../Components/LRInput";
import LROutput from "../Components/LROutput";
import { useState } from "react";
import '../css/LinearReg.css';
import { useIrisData } from "../Components/Iris"; 
import LRTable from "../Components/LRTable";
import LRGraph from "../Components/LRGraph";
import LRMetrics from "../Components/LRMetrics";
import Navbar from "../Components/Navigation";
function LR() {
  const Irisdata = useIrisData();
  const model=1;
  const [selectedColumns, setSelectedColumns] = useState({ x: "", y: "" });
  const [result, setResult] = useState(null); // 🔥 store backend result

  const handleColumnsSelect = async (cols) => {
    setSelectedColumns(cols);
      if (!cols.x || !cols.y) {
    setResult(null);
    return;
  }
    // 🔥 Call Python backend
    const res = await fetch("http://localhost:5000/LR_RF", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: Irisdata,
        xColumn: cols.x,
        yColumn: cols.y,
        model:model
      })
    });

    const output = await res.json();
    setResult(output); // 🔥 store result
  };

  return (
    <>
        <Navbar />
      <LRInput onColumnsSelect={handleColumnsSelect} />

      {/* 🔥 Now pass result instead of raw data */}
      <LROutput result={result} />
      {result && (
        <>
  <LRTable 
    x={result.x}
    y={result.y}
    predictions={result.predictions}
  />
  <LRGraph 
  x={result?.x} 
  y={result?.y} 
  predictions={result?.predictions}
  line_x={result?.line_x}
  line_y={result?.line_y}
/> 
<LRMetrics 
  x={result?.x}
  y={result?.y}
  predictions={result?.predictions}
/>
</>
)}

    </>
  );
}

export default LR;
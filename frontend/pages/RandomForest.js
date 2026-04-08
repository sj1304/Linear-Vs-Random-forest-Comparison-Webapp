import React, { useState } from "react";
import RFInput from "../Components/RFInput";
import RFOutput from "../Components/RFOutput";
import useIrisData from "../Components/Iris";

function RandomForest() {
  const irisData = useIrisData();
  const [result, setResult] = useState(null);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [overallAccuracy, setOverallAccuracy] = useState(null);

  const handleColumnsSelect = async (config) => {
    try {
      if (!irisData.length) {
        alert("Dataset is still loading...");
        return;
      }

      setSelectedConfig(config); // ✅ store selected columns

      const res = await fetch("http://127.0.0.1:5000/LR_RF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: irisData,
          xColumn: config.xColumn,
          yColumn: config.yColumn,
          trees: config.trees,
          depth: config.depth,
          model: 2
        })
      });

      const output = await res.json();
      setResult(output);
      const overallRes = await fetch("http://127.0.0.1:5000/overall-rf-accuracy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: irisData
        })
      });

      const overallData = await overallRes.json();
      setOverallAccuracy(overallData.overall_accuracy);

    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Backend connection failed.");
    }
  };

  return (
    <div>
      <RFInput onSubmit={handleColumnsSelect} />

  
        {result && selectedConfig && (
         <RFOutput
          result={result}
          xColumn={selectedConfig.xColumn}
          yColumn={selectedConfig.yColumn}
          xValues={irisData.map((row) =>
            parseFloat(row[selectedConfig.xColumn])
          )}
          actualValues={irisData.map((row) =>
            parseFloat(row[selectedConfig.yColumn])
          )}
          overallAccuracy={overallAccuracy}
        />
        )}
        
    </div>
  );
}

export default RandomForest;
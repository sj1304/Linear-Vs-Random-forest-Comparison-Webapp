import React, { useState } from "react";
import Navbar from "../Components/Navigation";  // 👈 add this
import InputForm from "../Components/Classification/InputForm";
import PredictionCards from "../Components/Classification/PredictionCards";
import MetricsDashboard from "../Components/Classification/MetricsDashboard";
import ChartsDashboard from "../Components/Classification/ChartsDashboard";

function Classification() {
  const [predictions, setPredictions] = useState(null);

  const handlePredict = async (data) => {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    setPredictions(result.predictions);
  };

  return (
    <div>
      <Navbar />  {/* 👈 add this */}
      <InputForm onPredict={handlePredict} />
      <PredictionCards predictions={predictions} />
      <ChartsDashboard />
    </div>
  );
}

export default Classification;
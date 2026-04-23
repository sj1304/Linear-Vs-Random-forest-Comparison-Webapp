import React from "react";
import "../../css/Summary.css";

function Summary({ data }) {

  return (
    <div className="summary-card">
      <h2>📌 Classification Analysis</h2>

      {/* 🌸 Decision Logic */}
      <div className="summary-section">
        <h3>🌼 Species Classification Insight</h3>

        <p>
          The classification mainly depends on petal and sepal measurements:
        </p>

        <ul>
          <li><strong>Iris Setosa</strong> → Small petal length & width</li>
          <li><strong>Iris Versicolor</strong> → Medium petal size</li>
          <li><strong>Iris Virginica</strong> → Large petal length & width</li>
        </ul>

        <p>
          Among all features, <strong>petal length</strong> and <strong>petal width</strong> are the most important for classification.
        </p>
      </div>

      {/* 🤖 Model Comparison */}
      <div className="summary-section">
        <h3>🤖 Model Performance Summary</h3>

        <p>
          All three models — <strong>KNN</strong>, <strong>Logistic Regression</strong>, and <strong>Random Forest</strong> — show almost identical performance.
        </p>

        <ul>
          <li><strong>KNN</strong>: Works by comparing similarity with nearby data points.</li>
          <li><strong>Logistic Regression</strong>: Uses linear boundaries to separate classes.</li>
          <li><strong>Random Forest</strong>: Uses multiple decision trees for robust prediction.</li>
        </ul>

        <p>
          Since the dataset is clean and well-separated, all models achieve very high accuracy and perform equally well.
        </p>
      </div>

      {/* 📊 Final Insight */}
      <div className="summary-section">
        <h3>📊 Final Insight</h3>

        <p>
          The Iris dataset is simple and linearly separable, which is why different machine learning models produce nearly identical results.
        </p>

        <p>
          In real-world datasets, performance differences between models become more significant due to noise and complexity.
        </p>
      </div>

    </div>
  );
}

export default Summary;
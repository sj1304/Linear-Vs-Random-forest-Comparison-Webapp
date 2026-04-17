import React from "react";
import "../css/Comparison.css";

function ModelProfile({ lrM, rfM }) {
  const lrWinner = lrM.r2 >= rfM.r2;

  return (
    <div className="cmp-section">
      <h2 className="section-title">🧠 Model Profile</h2>
      <div className="profile-grid">

        <div className="profile-card lr-card">
          <div className="profile-icon">📈</div>
          <h3>Linear Regression</h3>
          <p className="profile-tag">Simple · Fast · Interpretable</p>
          <ul className="profile-list">
            <li>Fits a straight line: <code>y = mx + b</code></li>
            <li>Works best for linear relationships</li>
            <li>Very fast to train</li>
            <li>Highly interpretable</li>
            <li>Can underfit complex data</li>
          </ul>
          {lrWinner && <div className="winner-badge">🏆 Better R² Score</div>}
        </div>

        <div className="profile-vs">VS</div>

        <div className="profile-card rf-card">
          <div className="profile-icon">🌲</div>
          <h3>Random Forest</h3>
          <p className="profile-tag">Complex · Robust · Non-linear</p>
          <ul className="profile-list">
            <li>Ensemble of decision trees</li>
            <li>Captures non-linear patterns</li>
            <li>Slower to train</li>
            <li>Black-box model</li>
            <li>Resistant to overfitting</li>
          </ul>
          {!lrWinner && <div className="winner-badge rf-winner">🏆 Better R² Score</div>}
        </div>
      </div>
    </div>
  );
}

export default ModelProfile;
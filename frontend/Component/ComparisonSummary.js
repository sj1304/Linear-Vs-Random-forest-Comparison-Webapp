import React from "react";
import "../css/Comparison.css";

function ComparisonSummary({ lrM, rfM, lrTime, rfTime }) {
  const metrics = [
    {
      label: "R² Score",
      hint: "Higher = Better",
      lr: lrM.r2.toFixed(4),
      rf: rfM.r2.toFixed(4),
      lrWins: lrM.r2 >= rfM.r2,
    },
    {
      label: "MAE",
      hint: "Lower = Better",
      lr: lrM.mae.toFixed(4),
      rf: rfM.mae.toFixed(4),
      lrWins: lrM.mae <= rfM.mae,
    },
    {
      label: "RMSE",
      hint: "Lower = Better",
      lr: lrM.rmse.toFixed(4),
      rf: rfM.rmse.toFixed(4),
      lrWins: lrM.rmse <= rfM.rmse,
    },
    {
      label: "MSE",
      hint: "Lower = Better",
      lr: lrM.mse.toFixed(4),
      rf: rfM.mse.toFixed(4),
      lrWins: lrM.mse <= rfM.mse,
    },
    {
      label: "Training Time",
      hint: "Lower = Better",
      lr: `${lrTime} ms`,
      rf: `${rfTime} ms`,
      lrWins: lrTime <= rfTime,
    },
    {
      label: "Interpretability",
      hint: "Subjective",
      lr: "High ✅",
      rf: "Low ❌",
      lrWins: true,
    },
    {
      label: "Handles Non-linearity",
      hint: "Subjective",
      lr: "No ❌",
      rf: "Yes ✅",
      lrWins: false,
    },
    {
      label: "Overfitting Risk",
      hint: "Lower = Better",
      lr: "Low ✅",
      rf: "Medium ⚠️",
      lrWins: true,
    },
  ];

  const lrWinCount = metrics.filter((m) => m.lrWins).length;
  const rfWinCount = metrics.length - lrWinCount;
  const overallWinner = lrWinCount >= rfWinCount ? "Linear Regression" : "Random Forest";
  const overallColor = overallWinner === "Linear Regression" ? "#a855f7" : "#22c55e";
  const overallIcon = overallWinner === "Linear Regression" ? "📈" : "🌲";

  return (
    <div className="cmp-section summary-section">
      <h2 className="section-title">🏁 Final Verdict — Summary Table</h2>

      <table className="summary-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Hint</th>
            <th className="th-lr">📈 Linear Regression</th>
            <th className="th-rf">🌲 Random Forest</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
            {metrics.map((m, i) => (
                <tr key={i} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                <td className="td-label">{m.label}</td>
                <td className="td-hint">{m.hint}</td>
                <td className={`td-val ${m.lrWins ? "cell-win" : "cell-lose"}`}>
                    {m.lrWins && <span className="win-dot" />}{m.lr}
                </td>
                <td className={`td-val ${!m.lrWins ? "cell-win" : "cell-lose"}`}>
                    {!m.lrWins && <span className="win-dot rf-dot" />}{m.rf}
                </td>
                <td className="td-winner">
                    {m.lrWins
                    ? <span className="badge-lr">📈 LR</span>
                    : <span className="badge-rf">🌲 RF</span>}
                </td>
                </tr>
            ))}
        </tbody>

        <tfoot>
          <tr className="score-row">
            <td colSpan={2} className="score-label">🏆 Total Wins</td>
            <td className="score-lr">{lrWinCount} / {metrics.length}</td>
            <td className="score-rf">{rfWinCount} / {metrics.length}</td>
            <td />
          </tr>
        </tfoot>
      </table>

      {/* VERDICT BANNER */}
      <div className="verdict-banner" style={{ borderColor: overallColor }}>
        <div className="verdict-icon">{overallIcon}</div>
        <div className="verdict-text">
          <span className="verdict-label">Overall Winner</span>
          <span className="verdict-name" style={{ color: overallColor }}>
            {overallWinner}
          </span>
          <span className="verdict-reason">
            {overallWinner === "Linear Regression"
              ? `Wins ${lrWinCount} out of ${metrics.length} metrics — simpler, faster, and more interpretable for this dataset.`
              : `Wins ${rfWinCount} out of ${metrics.length} metrics — better accuracy and handles non-linear patterns.`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ComparisonSummary;
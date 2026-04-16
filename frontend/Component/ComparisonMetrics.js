function calcMetrics(y, pred) {
  const n = y.length;
  let mse=0, mae=0, meanY = y.reduce((a,b)=>a+b,0)/n;
  let ssTot=0, ssRes=0;

  for(let i=0;i<n;i++){
    const e = y[i] - pred[i];
    mse += e*e;
    mae += Math.abs(e);
    ssRes += e*e;
    ssTot += (y[i]-meanY)**2;
  }

  mse/=n;
  mae/=n;
  const rmse = Math.sqrt(mse);
  const r2 = 1 - (ssRes/ssTot);

  return { mse, mae, rmse, r2 };
}

function ComparisonMetrics({ lr, rf }) {
  const lrM = calcMetrics(lr.y, lr.predictions);
  const rfM = calcMetrics(rf.y, rf.predictions);

  return (
    <div className="cmp-metrics">

      <div className="metric-card lr">
        <h3>Linear Regression</h3>
        <p>R²: {lrM.r2.toFixed(3)}</p>
        <p>MAE: {lrM.mae.toFixed(3)}</p>
        <p>RMSE: {lrM.rmse.toFixed(3)}</p>
        <p>MSE: {lrM.mse.toFixed(3)}</p>
      </div>

      <div className="metric-card rf">
        <h3>Random Forest</h3>
        <p>R²: {rfM.r2.toFixed(3)}</p>
        <p>MAE: {rfM.mae.toFixed(3)}</p>
        <p>RMSE: {rfM.rmse.toFixed(3)}</p>
        <p>MSE: {rfM.mse.toFixed(3)}</p>
      </div>

    </div>
  );
}

export default ComparisonMetrics;
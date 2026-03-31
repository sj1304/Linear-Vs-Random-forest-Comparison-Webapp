from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# ✅ Home route
@app.route("/")
def home():
    return "Backend Running Successfully ✅"


# ✅ MAIN API (matches React)
@app.route("/LR_RF", methods=["POST"])
def LR_RF():
    req_data = request.json

    data = req_data.get("data", [])
    x_col = req_data.get("xColumn")
    y_col = req_data.get("yColumn")
    model_type = req_data.get("model", 1)

    # ✅ Validation
    if not data:
        return jsonify({"error": "No data received"})

    if x_col not in data[0] or y_col not in data[0]:
        return jsonify({"error": "Invalid column names"})

    # 🔹 Convert to float
    x_vals = [float(row[x_col]) for row in data]
    y_vals = [float(row[y_col]) for row in data]

    # 🔹 Sort for proper graph
    combined = sorted(zip(x_vals, y_vals), key=lambda p: p[0])
    x_vals = [p[0] for p in combined]
    y_vals = [p[1] for p in combined]

    n = len(x_vals)

    # =====================================
    # 🔥 MODEL 1 → LINEAR REGRESSION
    # =====================================
    if model_type == 1:

        sum_x = sum(x_vals)
        sum_y = sum(y_vals)
        sum_xy = sum(x_vals[i] * y_vals[i] for i in range(n))
        sum_x2 = sum(x * x for x in x_vals)

        denominator = (n * sum_x2 - sum_x * sum_x)

        if denominator == 0:
            return jsonify({"error": "Division by zero"})

        slope = (n * sum_xy - sum_x * sum_y) / denominator
        intercept = (sum_y - slope * sum_x) / n

        predictions = [slope * x + intercept for x in x_vals]

        # ✅ Straight line
        min_x = min(x_vals)
        max_x = max(x_vals)

        line_x = [min_x, max_x]
        line_y = [
            slope * min_x + intercept,
            slope * max_x + intercept
        ]

        return jsonify({
            "model": 1,
            "x": x_vals,
            "y": y_vals,
            "slope": slope,
            "intercept": intercept,
            "predictions": predictions,
            "line_x": line_x,
            "line_y": line_y
        })

    # =====================================
    # 🔥 MODEL 2 → RANDOM FOREST
    # =====================================
    elif model_type == 2:

        from sklearn.ensemble import RandomForestRegressor
        from sklearn.metrics import mean_squared_error, r2_score

        X = np.array(x_vals).reshape(-1, 1)
        y = np.array(y_vals)

        trees = req_data.get("trees", 20)
        depth = req_data.get("depth", 4)

        model = RandomForestRegressor(
            n_estimators=int(trees),
            max_depth=int(depth),
            random_state=42
        )

        model.fit(X, y)
        predictions = model.predict(X).tolist()

        mse = mean_squared_error(y, predictions)
        r2 = r2_score(y, predictions)

        return jsonify({
            "model": 2,
            "x": x_vals,
            "y": y_vals,
            "predictions": predictions,
            "mse": round(float(mse), 4),
            "r2": round(float(r2), 4),
            "accuracy": round(float(r2 * 100), 2),

            "slope": None,
            "intercept": None,
            "line_x": [],
            "line_y": []
        })

    else:
        return jsonify({"error": "Invalid model type"})


# ✅ OPTIONAL RF OVERALL ACCURACY
@app.route("/overall-rf-accuracy", methods=["POST"])
def overall_rf_accuracy():
    req_data = request.json
    data = req_data["data"]

    from sklearn.ensemble import RandomForestRegressor
    from sklearn.metrics import r2_score

    columns = [
        "sepal_length",
        "sepal_width",
        "petal_length",
        "petal_width"
    ]

    accuracies = []

    for x_col in columns:
        for y_col in columns:
            if x_col == y_col:
                continue

            x_vals = [float(row[x_col]) for row in data]
            y_vals = [float(row[y_col]) for row in data]

            X = np.array(x_vals).reshape(-1, 1)
            y = np.array(y_vals)

            model = RandomForestRegressor(
                n_estimators=20,
                max_depth=4,
                random_state=42
            )

            model.fit(X, y)
            predictions = model.predict(X)

            r2 = r2_score(y, predictions)
            accuracies.append(r2 * 100)

    overall_accuracy = sum(accuracies) / len(accuracies)

    return jsonify({
        "overall_accuracy": round(overall_accuracy, 2)
    })


# ✅ RUN SERVER
if __name__ == "__main__":
    app.run(debug=True, port=5000)

import React, { useState } from "react";
import "../../css/InputForm.css";

const ranges = {
  sepal_length: [4.3, 7.9],
  sepal_width: [2.0, 4.4],
  petal_length: [1.0, 6.9],
  petal_width: [0.1, 2.5],
};

function InputForm({ onPredict }) {
  const [formData, setFormData] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: "",
  });

  const [errors, setErrors] = useState({});

  // Validate a single field
  const validateField = (name, value) => {
    const [min, max] = ranges[name];

    if (!value) return "Required";

    const num = parseFloat(value);
    if (num < min || num > max) {
      return `Expected ${min} - ${max}`;
    }

    return "";
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    const errorMsg = validateField(name, value);

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: errorMsg });
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      Object.values(formData).every((v) => v !== "") &&
      Object.values(errors).every((e) => e === "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    onPredict(formData);
  };

  return (
    <div className="form-wrapper">
      <h2 className="title">📊 Iris Species Predictor</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        
        {Object.keys(formData).map((key) => {
          const label = key.replace("_", " ").toUpperCase();
          const [min, max] = ranges[key];

          return (
            <div className="input-group" key={key}>
              <label>
                {label}
                <span className="tooltip">
                  ⓘ
                  <span className="tooltip-text">
                    Range: {min} - {max}
                  </span>
                </span>
              </label>

              <input
                type="number"
                name={key}
                placeholder={`${min} - ${max}`}
                value={formData[key]}
                onChange={handleChange}
                className={errors[key] ? "error-input" : ""}
              />

              {errors[key] && (
                <span className="error-text">{errors[key]}</span>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="predict-btn"
          disabled={!isFormValid()}
        >
          🚀 Predict
        </button>
      </form>
    </div>
  );
}

export default InputForm;

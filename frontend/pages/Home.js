import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import homeImg from "../images/homeImg.jpg";
import irisImg from "../images/irisImg.png";

function Home() {
  const exploreRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    exploreRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <p className="logo">⬡ OptiML</p>
          <h1>
            Comparison of <br />
            <span>Machine Learning</span> <br />
            Algorithms
          </h1>
          <p className="subtext">Regression Model</p>
          <button className="explore-btn" onClick={handleScroll}>
            Explore ↓
          </button>
        </div>
        <div className="hero-right">
          <img src={homeImg} alt="hero" />
        </div>
      </section>

      {/* EXPLORE SECTION */}
      <section className="explore-section" ref={exploreRef}>
        <p className="logoR">⬡ OptiML</p>

        <div className="header-group">
          <span className="s2-eyebrow">IRIS DATASET</span>
          <h2 className="main-title">Regression & Classification</h2>
          <p className="subtitle">
            Linear Regression <span className="vs">vs</span> Random Forest
          </p>
          <p className="subtitle">
            Classification of Iris species
          </p>
        </div>

        <div className="explore-layout">

          {/* LEFT 50%: NAVIGABLE CARDS */}
          <div className="explore-left">
            <div className="card-container">

              <div
                className="model-card lr-card"
                onClick={() => navigate("/LinearRegression")}  
                role="button"
                tabIndex="0"
              >
                <span className="icon">📈</span>
                <div className="card-content">
                  <h3>Linear Regression</h3>
                  <p>Predicting continuous values using linear relationships.</p>
                </div>
              </div>

              <div
                className="model-card rf-card"
                onClick={() => navigate("/RandomForest")}  
                role="button"
                tabIndex="0"
              >
                <span className="icon">🌲</span>
                <div className="card-content">
                  <h3>Random Forest</h3>
                  <p>Ensemble learning method for regression.</p>
                </div>
              </div>

              <div
                className="model-card cmp-card"
                onClick={() => navigate("/Comparison")}  
                role="button"
                tabIndex="0"
              >
                <span className="icon">⚡</span>
                <div className="card-content">
                  <h3>Comparison</h3>
                  <p>Side-by-side performance metrics analysis.</p>
                </div>
              </div>

              <div
                className="model-card cls-card"
                onClick={() => navigate("/Classification")}  
                role="button"
                tabIndex="0"
              >
                <span className="icon">🧠</span>
                <div className="card-content">
                  <h3>Classification</h3>
                  <p>Categorizing iris species based on features.</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT 50%: FLOWER + DATA BOX */}
          <div className="explore-right">
            <div className="flower-container">
              <img src={irisImg} alt="iris" />
              <span className="label petal-length">Petal Length</span>
              <span className="label petal-width">Petal Width</span>
              <span className="label sepal-length">Sepal Length</span>
              <span className="label sepal-width">Sepal Width</span>
            </div>

            <div className="iris-info-card">
              <h3 className="italic-title">Iris flower</h3>
              <p className="species-count">3 species in dataset</p>

              <ul className="species-list">
                <li><span className="dot setosa"></span> Setosa</li>
                <li><span className="dot versicolor"></span> Versicolor</li>
                <li><span className="dot virginica"></span> Virginica</li>
              </ul>

              <div className="divider"></div>
              <h4 className="stats-header">DATASET STATS</h4>
              <div className="stats-grid">
                <p>150 samples</p>
                <p>4 features</p>
                <p>50 per species</p>
              </div>

              <div className="divider"></div>
              <h4 className="stats-header">LABEL COLORS</h4>
              <ul className="label-colors">
                <li><span className="dot petal-dot"></span> Petal features</li>
                <li><span className="dot sepal-dot"></span> Sepal features</li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;
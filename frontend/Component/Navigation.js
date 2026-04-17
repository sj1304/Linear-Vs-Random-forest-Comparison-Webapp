import React from "react";

import { Link, useLocation } from "react-router-dom";
//link used instead of anchor tag to prevent page reload and maintain SPA behaviour
//useLocation gives current URL path and helps in highlighting active page link in navbar


import "../css/Navigation.css";

//navigation bar common to LR , RFR , Comparison pages
function Navbar() 
{
  const location = useLocation();  //gives current route path to determine which link is active 

  //location.pathname gives current route
  
  return (
    <nav className="main-navbar">

      {/* LEFT LOGO */}
      <div className="nav-left">
        <span className="logo-icon">⬡</span>
        <span className="logo-text">OptiML</span>
      </div>

      {/* CENTER LINKS */}
      <div className="nav-center">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/LinearRegression" className={location.pathname === "/LinearRegression" ? "active" : ""}>
          Linear Regression
        </Link>
        <Link to="/RandomForest" className={location.pathname === "/RandomForest" ? "active" : ""}>
          Random Forest
        </Link>
        <Link to="/Comparison" className={location.pathname === "/Comparison" ? "active" : ""}>
          Comparison
        </Link>
        <Link to="/Classification" className={location.pathname === "/Classification" ? "active" : ""}>  {/* 👈 add this */}
          Classification
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
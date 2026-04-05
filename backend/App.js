import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./Components/Navigation";
import Home from "./pages/Home";
import LinearReg from "./pages/LinearReg";
import RandomForest from "./pages/RandomForest";
import Comparison from "./pages/Comparison";

function App() {
  return (
    
    <BrowserRouter>

      {/* ✅ Navbar visible everywhere */}
      <Navigation />

      {/* ✅ Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LinearRegression" element={<LinearReg />} />
        <Route path="/RandomForest" element={<RandomForest />} />
        <Route path="/Comparison" element={<Comparison />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
import React from "react";
import "./App.css";
// import Card from "./components/Card/Card";
import Landing from "./components/Landing/Landing";
import { Route, Routes, useLocation } from "react-router-dom";
import Menu from "./components/Menu/Menu";

import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Menu />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      {/* <Card /> */}
    </div>
  );
}

export default App;

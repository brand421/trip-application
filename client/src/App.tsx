import React from "react";
import "./App.css";
// import Card from "./components/Card/Card";
import Landing from "./components/Landing/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/searchresults" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>

      {/* <Card /> */}
    </div>
  );
}

export default App;

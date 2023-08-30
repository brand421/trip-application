import React from "react";
import "./App.css";
// import Card from "./components/Card/Card";
import Landing from "./components/Landing/Landing";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <div className="App">
      <Menu />
      <Landing />
      {/* <Card /> */}
    </div>
  );
}

export default App;

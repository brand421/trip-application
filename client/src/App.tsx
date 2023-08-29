import React from "react";
import "./App.css";
// import Card from "./components/Card/Card";
import Landing from "./components/Landing/Landing";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <div className="App">
      <Menu />
      {/* @ts-expect-error */}
      <Landing />
      {/* <Card /> */}
    </div>
  );
}

export default App;

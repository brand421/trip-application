import React, { useEffect, useState } from "react";
import "./landing.css";
import { Button } from "@mui/base";
import logo from "./TAlogo.png";
import { SessionToken } from "@mapbox/search-js-core";

function Landing() {
  const [input, setInput] = useState("");
  const [cityList, setCityList] = useState([
    {
      name: "",
      place_formatted: "",
    },
  ]);

  const sessionToken = new SessionToken();

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=${input}&language=en&types=locality,city&session_token=${sessionToken}&access_token=${process.env.REACT_APP_MAPBOX_API}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCityList(data);
      });
      .catch((err) => {
        console.log(err.message)
      });
  }), [];

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  // const cityList: any = (search: string) => {
  //   let results = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${search}&access_token=${process.env.REACT_APP_MAPBOX_API}&session_token=0c1ad424-ebbc-4b8d-9b1b-f3312c1fbf10&language=en&limit=5&types=locality%2Cplace`;
  // };

  return (
    <div className="landing__container">
      <h1 className="header">Where do you want to go?</h1>
      <h4>
        Powered by <img className="logo" src={logo} alt="tripadvisor logo" />
      </h4>
      <form
        className="landing__form"
        action="/"
        method="POST"
        // onSubmit={onSubmit}
      >
        <input id="city" onChange={handleChange} />
        <Button type="submit" className="landing__submit">
          Submit
        </Button>
      </form>
      <div className="results__container">
        <div className="results__list">
          <div className="result__header">{cityList.map((x) => x.name)}</div>
          <div className="result__subheader">
            {cityList.map((x) => x.place_formatted)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

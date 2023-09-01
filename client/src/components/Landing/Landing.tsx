import React, { useEffect, useState } from "react";
import "./landing.css";
import { Button } from "@mui/base";
import logo from "./TAlogo.png";
import { SessionToken } from "@mapbox/search-js-core";
import { SearchBox } from "@mapbox/search-js-react";

function Landing() {
  // const [search, setSearch] = useState("");
  const [cityList, setCityList] = useState<[]>([]);

  const handleChange = (e: any) => {
    const search = e.target.value;
    const sessionToken = new SessionToken();
    fetch(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=${search}&language=en&types=locality,city&session_token=${sessionToken}&access_token=${mapboxToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCityList(data);
        console.log(cityList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const mapboxToken = process.env.REACT_APP_MAPBOX_API;
  // useEffect(() => {
  // const sessionToken = new SessionToken();
  //   fetch(
  //     `https://api.mapbox.com/search/searchbox/v1/suggest?q=${search}&language=en&types=locality,city&session_token=${sessionToken}&access_token=${mapboxToken}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCityList(data);
  //       console.log(cityList);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, [search]);

  return (
    <div className="landing__container">
      <h1 className="header">Where do you want to go?</h1>
      <h4>
        Powered by <img className="logo" src={logo} alt="tripadvisor logo" />
      </h4>
      <form className="landing__form" action="/" method="POST">
        <input id="city" onChange={handleChange} />
        <Button type="submit" className="landing__submit">
          Submit
        </Button>
      </form>
      <div className="results__container">
        <div className="results__list">
          <div className="result__header">
            {/* <ul>
              {cityList.map((x, index) => (
                <li key={index}>
                  <span>{x.name}</span>
                  <span>{cityList.map((x) => x.place_formatted)}</span>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

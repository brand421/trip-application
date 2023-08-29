import React, { useEffect, useState } from "react";
import { Input } from "@mui/base/Input";
import "./landing.css";
import { Button } from "@mui/base";
import logo from "./TAlogo.png";
import { SearchBox } from "@mapbox/search-js-react";
import { types } from "util";
import { AddressAutofill } from "@mapbox/search-js-react";

export type Results = {
  attraction: string;
  image: string;
  description: string;
}[];

function Landing() {
  // const [search, setSearch] = useState("");

  // const [card, setCard] = useState<Results | undefined>(undefined);

  // const fetchData = async (input: string) => {
  //   await fetch(`http://localhost:5000/${input}`).then(async (res) => {
  //     const response: Results = await res.json();
  //     setCard(response);
  //   });
  // };

  // useEffect(() => {
  //   fetchData(search);
  // }, [search]);

  return (
    <div className="landing__container">
      <h1 className="header">Where do you want to go?</h1>
      <h4>
        Powered by <img className="logo" src={logo} alt="tripadvisor logo" />
      </h4>
      <form className="landing__form">
        <SearchBox
          value=""
          accessToken={process.env.REACT_APP_MAPBOX_API!}
          options={{ types: "city" }}
          placeholder="Enter your destination city"
        ></SearchBox>
        <Button type="submit" className="landing__submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Landing;

import React, { useEffect, useState } from "react";
import { Input } from "@mui/base/Input";
import "./landing.css";
import { Button } from "@mui/base";
import logo from "./TAlogo.png";

export type Results = {
  attraction: string;
  image: string;
  description: string;
}[];

function Landing() {
  const [city, setCity] = useState("");
  const [autoCompleteCity, setAutoCompleteCity] = useState<string[]>([]);
  const [autoCompleteErr, setAutoCompleteErr] = useState("");
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

  const fetchPlace = async (text: string) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${text}&language=en&types=city&session_token=02983577-e734-4d88-818a-3dad28100538&access_token=${process.env.REACT_APP_MAPBOX_API}`
      );
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    } catch (err) {
      return { error: "Unable to retrieve places" };
    }
  };

  const handleCityChange = async (e: any | undefined) => {
    setCity(e.target.value);
    if (!city) return;

    const res = await fetchPlace(city);
    !autoCompleteCity.includes(e.target.value) &&
      res.features &&
      setAutoCompleteCity(
        res.features.map((place: any | undefined) => place.place_name)
      );
    res.error ? setAutoCompleteErr(res.error) : setAutoCompleteErr("");
  };

  return (
    <div className="landing__container">
      <h1 className="header">Where do you want to go?</h1>
      <h4>
        Powered by <img className="logo" src={logo} alt="tripadvisor logo" />
      </h4>
      <form className="landing__form">
        <Input
          className="landing__input"
          id="city"
          type="text"
          onChange={handleCityChange}
          value={city}
          required
          placeholder="Enter your destination"
        />
        <datalist id="places">
          {autoCompleteCity.map((city, i) => (
            <option key={i}>{city}</option>
          ))}
        </datalist>
        <Button type="submit" className="landing__submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Landing;

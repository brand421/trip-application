import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./landing.css";
import { Button } from "@mui/base";
import logo from "./TAlogo.png";
import axios from "axios";
import { motion } from "framer-motion";
import { SessionToken } from "@mapbox/search-js-core";
import { SearchBox } from "@mapbox/search-js-react";

function Landing() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    city: "",
  });
  // const [cityList, setCityList] = useState<[]>([]);

  // const handleChange = (e: any) => {
  //   const search = e.target.value;
  //   const sessionToken = new SessionToken();
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
  // };

  // const mapboxToken = process.env.REACT_APP_MAPBOX_API;
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

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(search);
    if (search.city === "") {
      navigate("/error");
    } else {
      axios
        .post("http://localhost:5000/", { city: search })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          navigate("/searchresults");
        });
    }
  }

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <motion.div className="landing__container">
      <h1 className="header">Where Are You Headed?</h1>
      <h4>
        Powered by <img className="logo" src={logo} alt="tripadvisor logo" />
      </h4>
      <form className="landing__form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="city"
          name="city"
          value={search.city}
          onChange={handleChange}
          className="landing__input"
        />
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
    </motion.div>
  );
}

export default Landing;

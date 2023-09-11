import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./landing.css";
import { Button } from "@mui/base";
import logo from "./TAlogo.png";
import axios from "axios";
import { motion } from "framer-motion";
import { SessionToken } from "@mapbox/search-js-core";

function Landing() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const container = {
    hidden: { opacity: 0, x: "-100px" },
    show: {
      opacity: 1,
      x: "0px",
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: "50px" },
    show: {
      opacity: 1,
      x: "0px",
    },
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const serialBody = JSON.stringify(search);
  //   const fetchOptions = {
  //     method: "POST",
  //     body: serialBody,
  //   };
  //   fetch("http://www.localhost:5000/searchresults", fetchOptions).then(
  //     (res) => {
  //       console.log(res);
  //       navigate("/searchresults");
  //     }
  //   );
  // };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const mapboxToken = process.env.REACT_APP_MAPBOX_API;
    const sessionToken = new SessionToken();
    e.preventDefault();
    const regex: RegExp = / /i;
    let cityReplace = search.replace(regex, "+");
    console.log(cityReplace);
    axios
      .post(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${cityReplace}&language=en&limit=5&types=city,locality&session_token=${sessionToken}&access_token=${mapboxToken}`
      )
      .then((res) => {
        console.log(res);
        navigate("/searchresults");
      })
      .catch((err) => {
        console.log(err);
        navigate("/searchresults");
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.currentTarget.value;
    setSearch(search);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, x: "100px" }}
      className="landing__container"
    >
      <motion.div variants={item} initial="hidden" animate="show" exit="hidden">
        <h1 className="header">Where Are You Headed?</h1>
        <h4>
          Powered by <img className="logo" src={logo} alt="tripadvisor logo" />
        </h4>
      </motion.div>
      <motion.div variants={item} initial="hidden" animate="show" exit="hidden">
        <form className="landing__form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="city"
            name="city"
            value={search}
            onChange={handleChange}
            className="landing__input"
            required
          />
          <Button type="submit" className="landing__submit">
            Submit
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Landing;

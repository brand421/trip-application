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
  const [search, setSearch] = useState<{ city: string }>({ city: "" });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serialBody = JSON.stringify(search);
    const fetchOptions = {
      method: "POST",
      body: serialBody,
    };
    fetch("http://www.localhost:5000/", fetchOptions).then((res) => {
      console.log(res);
      navigate("/searchresults");
      return res.json();
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.currentTarget.value;
    setSearch({ city: search });
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
            value={search.city}
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

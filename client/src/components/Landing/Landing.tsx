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

  //
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

  function handleSubmit(e: any) {
    const mapboxToken = process.env.REACT_APP_MAPBOX_API;
    const sessionToken = new SessionToken();
    e.preventDefault();
    console.log(search);
    axios
      .post(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${search}&language=en&types=locality,city&limit=5&session_token=${sessionToken}&access_token=${mapboxToken}`
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

  const handleChange = (e: any) => {
    let city = e.target.value;
    const regex: RegExp = / /i;
    let cityReplace = city.replace(regex, "+");
    setSearch(cityReplace);
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

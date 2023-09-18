import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./landing.css";
import { Button } from "@mui/base";
import logo from "./TAlogo.png";
import { motion } from "framer-motion";
import { SessionToken } from "@mapbox/search-js-core";

function Landing() {
  interface cityResults {
    name: string;
    place: string;
  }

  const navigate = useNavigate();
  const [search, setSearch] = useState<{ city: string }>({ city: "" });
  const [results, setResults] = useState<cityResults[]>([
    { name: "", place: "" },
  ]);
  const [submit, setSubmit] = useState<boolean>(false);

  const containerSearch = {
    hidden: { opacity: 0, x: "-100px" },
    show: {
      opacity: 1,
      x: "0px",
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const containerResults = {
    hidden: { opacity: 0, y: "50px" },
    show: {
      opacity: 1,
      y: "0px",
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemSearch = {
    hidden: { opacity: 0, x: "50px" },
    show: {
      opacity: 1,
      x: "0px",
    },
  };

  const itemResults = {
    hidden: { opacity: 0, y: "50px" },
    show: {
      opacity: 1,
      y: "0px",
    },
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mapboxToken = process.env.REACT_APP_MAPBOX_API;
    const sessionToken = new SessionToken();
    const newSearch = search.city.trim().replace(/ /g, "+");
    const newResults: cityResults[] = [];
    console.log(newSearch);
    fetch(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=${newSearch}&language=en&limit=5&types=city,locality&session_token=${sessionToken}&access_token=${mapboxToken}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (let i = 0; i < data.suggestions.length; i++) {
          newResults.push({
            name: data.suggestions[i].name,
            place: data.suggestions[i].place_formatted,
          });
        }
        console.log(newResults);
        setResults(newResults);
        setSubmit(true);
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.currentTarget.value;
    setSearch({ city: search });
  };

  return (
    <>
      <motion.div
        variants={containerSearch}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, x: "100px" }}
        className="landing__container"
      >
        <motion.div
          variants={itemSearch}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <h1 className="header">Where Are You Headed?</h1>
          <h4>
            Powered by{" "}
            <img className="logo" src={logo} alt="tripadvisor logo" />
          </h4>
        </motion.div>
        <motion.div
          variants={itemSearch}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
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
      <>
        {submit ? (
          <div className="search__container">
            <div>
              <h1 className="sub__header">Which City Did You Want?</h1>
            </div>
            <div className="city__block">
              <motion.div
                variants={containerResults}
                initial="hidden"
                animate="show"
                className="cities__list"
              >
                {results.map((x, key) => (
                  <motion.div
                    variants={itemResults}
                    key={key}
                    className="city__list"
                  >
                    <a href="#">
                      <h3 className="city__name">{x.name}</h3>
                      {x.place.length > 25 ? (
                        <p className="place__name">
                          {x.place.slice(0, 25) + "..."}
                        </p>
                      ) : (
                        <p className="place__name">{x.place}</p>
                      )}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
}

export default Landing;

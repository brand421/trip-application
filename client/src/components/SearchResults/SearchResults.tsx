import React from "react";
import { motion } from "framer-motion";
import "./searchresults.css";

function SearchResults() {
  const container = {
    hidden: { opacity: 0, y: "50px" },
    show: {
      opacity: 1,
      y: "0px",
      transition: {
        staggerChildren: 0.13,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: "50px" },
    show: {
      opacity: 1,
      y: "0px",
    },
  };
  const cities = [
    {
      city: "Stockholm",
      country: "Sweden",
    },
    {
      city: "New York",
      country: "United States",
    },
    {
      city: "Sao Paolo",
      country: "Brazil",
    },
  ];
  return (
    <div className="search__container">
      <div>
        <h1 className="header">Which City Did You Want?</h1>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="cities__list"
      >
        {cities.map((x, key) => (
          <motion.div variants={item} key={key} className="city__list">
            <h3 className="city__name">{x.city}</h3>
            <p className="country__name">{x.country}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default SearchResults;

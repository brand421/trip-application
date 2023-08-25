import React, { useState } from "react";
import { motion } from "framer-motion";
import "./card.css";

function Card() {
  const [expand, setExpand] = useState(false);

  const [data, setData] = useState({
    name: String,
    review: Array,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  });

  function handleExpand() {
    setExpand(!expand);
  }
  return (
    <motion.div
      className="card"
      animate={expand ? { height: "575px" } : { height: "400px" }}
    >
      <div>
        <h2>Test card</h2>
      </div>
      <div>
        <img
          className="card__img"
          src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/23/f6/5f.jpg"
          alt={data.name.toString()}
        />
      </div>
      <motion.div transition={{ delay: 1 }} className="card__desc">
        {expand ? (
          <p className="desc">{data.description.toString()}</p>
        ) : (
          <p className="desc">
            {data.description.toString().substring(0, 75)}...
          </p>
        )}
        <div className="desc__expand">
          {expand ? (
            <p onClick={handleExpand} className="expand">
              See Less
            </p>
          ) : (
            <p onClick={handleExpand} className="expand">
              See More
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Card;

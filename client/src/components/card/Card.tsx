import React, { useState } from "react";
import "./card.css";

function Card() {
  const [data, setData] = useState({
    name: String,
    review: Array,
    description: String,
  });
  return (
    <div className="card">
      <div>
        <h2>Test card</h2>
      </div>
      <div>
        <img
          className="card__img"
          src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/23/f6/5f.jpg"
        />
      </div>
      <div className="card__desc"></div>
    </div>
  );
}

export default Card;

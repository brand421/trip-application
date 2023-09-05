import React from "react";
import "./searchresults.css";

function SearchResults() {
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
      <div className="cities__list">
        {cities.map((x, key) => (
          <div key={key}>
            <h3>{x.city}</h3>
            <p>{x.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

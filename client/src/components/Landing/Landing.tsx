import React, { useEffect, useState } from "react";
import { Input } from "@mui/base/Input";
import "./landing.css";
import { Button } from "@mui/base";

export type Results = {
  attraction: string;
  image: string;
  description: string;
}[];

function Landing() {
  const [search, setSearch] = useState("");

  const [card, setCard] = useState<Results | undefined>(undefined);

  const fetchData = async (input: string) => {
    await fetch(`http://localhost:5000/${input}`).then(async (res) => {
      const response: Results = await res.json();
      setCard(response);
    });
  };

  useEffect(() => {
    fetchData(search);
  }, [search]);
  return (
    <div className="landing__container">
      <h1>Where do you want to go?</h1>
      <form className="landing__form">
        <Input
          className="landing__input"
          type="text"
          placeholder="Enter your dream location"
        />
        <Button type="submit" className="landing__submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Landing;

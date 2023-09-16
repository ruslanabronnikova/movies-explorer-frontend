import React from "react";
import "./Portfolio.css";

const Portfolio = ({ title, url }) => {
  return (
    <li className={"works"}>
      <a href={url} className={"works__url"} target="blank">
        {title}
        <p className={"works__arrow"}>↗</p>
      </a>
    </li>
  );
};

export default Portfolio;

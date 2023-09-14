import React from "react";
import "./Portfolio.css";
import IconArrow from "../../images/arrow.png";

const Portfolio = ({ title, url }) => {
  return (
    <li className={"works"}>
      <a href={url} className={"works__url"}>
        {title}
        <img src={IconArrow} alt={"Стрелка"} className={"works__arrow"} />
      </a>
    </li>
  );
};

export default Portfolio;

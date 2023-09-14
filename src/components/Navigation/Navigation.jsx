import React from "react";
import { Link } from "react-router-dom";
import "./Navigatin.css";

const Navigation = () => {
  return (
    <nav className={"navigation"}>
      <ul className={"navigation__container"}>
        <Link to="/movies">
          <li className={"navigation__name"}>Фильмы</li>
        </Link>
        <Link to="/saved-movies">
          <li className={"navigation__name"}>Сохранённые фильмы</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;

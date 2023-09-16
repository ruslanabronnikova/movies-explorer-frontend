import React from "react";
import { Link } from "react-router-dom";
import "./Navigatin.css";

const Navigation = () => {
  return (
    <nav className={"navigation"}>
      <ul className={"navigation__container"}>
        <li className={"navigation__name"}>
          <Link to="/movies">Фильмы</Link>
        </li>
        <li className={"navigation__name"}>
          <Link to="/saved-movies">Сохранённые фильмы</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

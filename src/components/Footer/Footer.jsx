import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className={"footer"}>
      <p className={"footer__title"}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className={"footer__nav"}>
        <p className={"footer__year"}>© 2020</p>
        <ul className={"footer__links"}>
          <li className={"footer__link"}>
            <Link
              to="https://practicum.yandex.ru/"
              target="blank"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className={"footer__link"}>
            <Link
              to="https://github.com/ruslanabronnikova"
              target="blank"
            >
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

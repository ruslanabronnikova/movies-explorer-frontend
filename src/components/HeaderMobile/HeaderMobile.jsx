import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./HeaderMobile.css";
import BtnCloseMenu from "../IconUi/BtnCloseMenu";

const HeaderMobile = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <div
      className={`header__menu-container ${
        isOpen ? "header__menu_opened" : ""
      }`}
    >
      {isOpen && <div className={"header__overlay"} onClick={onClose}></div>}
      <button type="button" className={"header__menu-btn-close"} onClick={onClose}>
        <BtnCloseMenu />
      </button>
      <div className={"header__menu-content"}>
        <nav className={"header__menu-url"}>
          <ul className={"header__menu-links"}>
            <li
              className={`header__menu-name ${
                location.pathname === "/" ? "header__menu-name_active" : ""
              }`}
            >
              <Link to="/">Главная </Link>
            </li>
            <li
              className={`header__menu-name ${
                location.pathname === "/movies"
                  ? "header__menu-name_active"
                  : ""
              }`}
            >
              <Link to="/movies">Фильмы</Link>
            </li>
            <li
              className={`header__menu-name ${
                location.pathname === "/saved-movies"
                  ? "header__menu-name_active"
                  : ""
              }`}
            >
              <Link to="/saved-movies">Сохранённые фильмы</Link>
            </li>
          </ul>
        </nav>
        <Link to="/profile" className={"header__menu-link-account"}>
          <button type="button" className={"header__menu-btn-account"}>Аккаунт</button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderMobile;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./HeaderMobile.css";
import BtnCloseMenu from "../IconUi/BtnCloseMenu";

const HeaderMobile = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <div className={`menu-container ${isOpen ? "menu_opened" : ""}`}>
      {isOpen && <div className={"overlay"} onClick={onClose}></div>}
      <button className={"menu__btn-close"} onClick={onClose}>
        <BtnCloseMenu />
      </button>
      <div className={"menu__content"}>
        <nav className={"menu__url"}>
          <ul className={"menu__container"}>
            <li
              className={`menu__name ${
                location.pathname === "/" ? "menu__name_active" : ""
              }`}
            >
              <Link to="/">Главная </Link>
            </li>
            <li
              className={`menu__name ${
                location.pathname === "/movies" ? "menu__name_active" : ""
              }`}
            >
              <Link to="/movies">Фильмы</Link>
            </li>
            <li
              className={`menu__name ${
                location.pathname === "/saved-movies" ? "menu__name_active" : ""
              }`}
            >
              <Link to="/saved-movies">Сохранённые фильмы</Link>
            </li>
          </ul>
        </nav>
        <Link to="/profile">
          <button className={"menu__btn-account"}>Аккаунт</button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderMobile;

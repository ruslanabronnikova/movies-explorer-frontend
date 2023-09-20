import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../IconUi/LogoIcon";
import Navigation from "../Navigation/Navigation";
import HeaderMobile from "../HeaderMobile/HeaderMobile";
import BtnOpenMenu from "../IconUi/BtnOpenMenu";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isAuthenticated = localStorage.getItem("JWT");;

  return (
    <header className={"header"}>
      <div className={"header__logo-container"}>
        <Link to="/">
          <LogoIcon />
        </Link>
      </div>
      {isAuthenticated ? (
        <div className={"header__menu"}>
          <Navigation />
        </div>
      ) : null}
      <div className={"header__log"}>
        {isAuthenticated ? (
          <Link to="/profile">
            <button type="button" className={"header__account-button"}>Аккаунт</button>
          </Link>
        ) : (
          <nav className="header__btns-log">
            <button type="button" className={"header__register-button"}><Link to="/signup">Регистрация</Link></button>
            <button type="button" className={"header__login-button"}><Link to="/signin">Войти</Link></button>
          </nav>
        )}
        {isAuthenticated ? (
          <button type="button" className={"header__btn-open"} onClick={handleMobileMenuClick}>
            <BtnOpenMenu />
          </button>
        ) : null}
      </div>
      {isAuthenticated ? (
        <HeaderMobile isOpen={isMobileMenuOpen} onClose={handleMobileMenuClick} />
      ) : null}
    </header>
  );
};

export default Header;



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

  const isAuthenticated = true;

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
            <button className={"header__account-button"}>Аккаунт</button>
          </Link>
        ) : (
          <div className="header__btns-log">
            <button className={"header__register-button"}><Link to="/sign-up">Регистрация</Link></button>
            <button className={"header__login-button"}><Link to="sign-in">Вход</Link></button>
          </div>
        )}
        <button className={"header__btn-open"} onClick={handleMobileMenuClick}>
          <BtnOpenMenu />
        </button>
      </div>
      {isAuthenticated ? (
        <HeaderMobile isOpen={isMobileMenuOpen} onClose={handleMobileMenuClick} />
      ) : null}
    </header>
  );
};

export default Header;


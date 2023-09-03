import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../../images/logo.png'
import Navigation from '../Navigation/Navigation';
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-container">
        <img src={logo} className="header__logo" alt="Логотип Место" />
      </div>
      <Navigation />
      <div className='header__log'>
        <button className="header__account-button">Аккаунт</button>
        {/* {!isAuthenticated && (
          <div className='header__btns-log'>
            <button className="header__register-button">Регистрация</button>
            <button className="header__login-button">Вход</button>
          </div>
        )} */}
      </div>
    </header>
  );
}

export default Header
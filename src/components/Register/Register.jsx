import React from "react";
import "./Register.css";
import LogoIcon from "../IconUi/LogoIcon";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main>
      <section className={"log"}>
        <div className={"log__container"}>
          <div className={"log__logo"}>
            <Link to="/">
              <LogoIcon />
            </Link>
          </div>
          <h1 className={"log__title"}>Добро пожаловать!</h1>
          <form className={"log__form"} id="loginform" method="post">
            <div className={"log__input-container"}>
              <label htmlFor="nameUser" className={"log__label"}>
                Имя
              </label>
              <input
                type="text"
                className={"log__input from__input_email_value"}
                name="name"
                id="nameUser"
                minLength="2"
                maxLength="40"
                required
              />
            </div>
            <div className={"log__input-container"}>
              <label htmlFor="emailUser" className={"log__label"}>
                Email
              </label>
              <input
                type="email"
                className={"log__input from__input_email_value"}
                name="email"
                id="emailUser"
                minLength="2"
                maxLength="40"
                required
              />
            </div>
            <div className={"log__input-container"}>
              <label htmlFor="passwordUser" className={"log__label"}>
                Пароль
              </label>
              <input
                type="password"
                className={"log__input from__input_password_value"}
                name="password"
                id="passwordUser"
                minLength="2"
                maxLength="40"
                required
              />
            </div>
          </form>
          <button type="submit" id="log" className={"log__button-form"}>
            Зарегистрироваться
          </button>

          <p className={"log__link"} to="/sign-in">
            Уже зарегистрированы?
            <span className={"logo__link-signin"}>
              <Link to="/sign-in">Войти</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;

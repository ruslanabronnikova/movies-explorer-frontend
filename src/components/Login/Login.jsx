import React from "react";
import LogoIcon from "../IconUi/LogoIcon";
import { Link } from "react-router-dom";
import "../Register/Register.css";

const Login = () => {
  return (
    <main>
      <section className={"log"}>
        <div className={"log__container"}>
          <div className={"log__logo"}>
            <Link to="/">
              <LogoIcon />
            </Link>
          </div>
          <h1 className={"log__title"}>Рады видеть!</h1>
          <form className={"log__form"} id={"loginform"} method={"post"}>
            <div className={"log__input-container"}>
              <label htmlFor={"nameUser"} className={"log__label"}>
                E-mail
              </label>
              <input
                type={"text"}
                className={"log__input"}
                name={"email"}
                id={"emailser"}
                minLength={"2"}
                maxLength={"40"}
                required
                placeholder="E-mail"
              />
            </div>
            <div className={"log__input-container"}>
              <label htmlFor={"passwordUser"} className={"log__label"}>
                Пароль
              </label>
              <input
                type={"password"}
                className={"log__input"}
                name={"password"}
                id={"passwordUser"}
                minLength={"2"}
                maxLength={"40"}
                required
                placeholder="Пароль"
              />
            </div>
          </form>
          <button type={"submit"} id={"log"} className={"log__button-signin"}>
            Войти
          </button>

          <p className={"log__link"} to="/sign-in">
            Ещё не зарегистрированы?
            <span className={"log__link-signin"}>
              <Link to="/signup"> Регистрация</Link>{" "}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;

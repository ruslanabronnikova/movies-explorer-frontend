import React, { useState } from "react";
import "./Register.css";
import LogoIcon from "../IconUi/LogoIcon";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
    name: "",
  });

  const [formErrors, setFormErrors] = useState({
    password: "",
    email: "",
    name: "",
  });

  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    validateField(name, value);
  };

const validateField = (name, value) => {
  let errors = { ...formErrors };
  switch (name) {
    case "name":
      if (!value.trim()) {
        errors.name = "Поле 'Имя' обязательно для заполнения";
      } else {
        errors.name = "";
      }
      break;
    case "email":
      if (!value.trim()) {
        errors.email = "Поле 'Email' обязательно для заполнения";
      } else if (!isValidEmail(value)) {
        errors.email = "Введите корректный Email";
      } else {
        errors.email = "";
      }
      break;
    case "password":
      if (!value.trim()) {
        errors.password = "Поле 'Пароль' обязательно для заполнения";
      } else if (value.length < 8) {
        errors.password = "Пароль должен содержать не менее 8 символов";
      } else {
        errors.password = "";
      }
      break;
    default:
      break;
  }

  setFormErrors(errors);
  setIsValid(Object.values(errors).every((error) => error === ""));
};

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isValid) {
      let { password, email, name } = formValue;
      props.onReg({ password, email, name });
    }
  };

  const isValidEmail = (email) => {
    // Простейшая проверка на корректный email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
          <form
            className={"log__form"}
            id="loginform"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className={"log__input-container"}>
              <label htmlFor="nameUser" className={"log__label"}>
                Имя
              </label>
              <input
                type="text"
                className={"log__input" + (formErrors.name ? " error" : "")}
                name="name"
                id="nameUser"
                minLength="2"
                maxLength="40"
                required
                placeholder="Имя"
                value={formValue.name}
                onChange={handleChange}
              />
              <span className="error">{formErrors.name}</span>
            </div>
            <div className={"log__input-container"}>
              <label htmlFor="emailUser" className={"log__label"}>
                Email
              </label>
              <input
                type="email"
                className={"log__input" + (formErrors.email ? " error" : "")}
                name="email"
                id="emailUser"
                minLength="2"
                maxLength="40"
                required
                placeholder="Email"
                value={formValue.email}
                onChange={handleChange}
              />
              <span className="error">{formErrors.email}</span>
            </div>
            <div className={"log__input-container"}>
              <label htmlFor="passwordUser" className={"log__label"}>
                Пароль
              </label>
              <input
                type="password"
                className={"log__input" + (formErrors.password ? " error" : "")}
                name="password"
                id="passwordUser"
                minLength="2"
                maxLength="40"
                required
                placeholder="Пароль"
                value={formValue.password}
                onChange={handleChange}
              />
              <span className="error">{formErrors.password}</span>
            </div>
            <button
              type="submit"
              id="log"
              className={`log__button-form ${isValid ? "" : "log__button-form_disabled"}`}
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>

          </form>
          <p className={"log__link"} to="/sign-in">
            Уже зарегистрированы?
            <span className={"log__link-signin"}>
              <Link to="/signin"> Войти</Link>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;

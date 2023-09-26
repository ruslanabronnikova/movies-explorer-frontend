import React, { useState } from "react";
import LogoIcon from "../IconUi/LogoIcon";
import { Link } from "react-router-dom";
import "../Register/Register.css";

const Login = (props) => {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    password: "",
    email: "",
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
      case "email":
        if (!value.trim()) {
          errors.email = "Поле 'E-mail' обязательно для заполнения";
        } else if (!isValidEmail(value)) {
          errors.email = "Введите корректный E-mail";
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
    setIsValid(Object.values(errors).every((error) => error === "") && Object.values(formValue).every((value) => !!value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      let { password, email } = formValue;
      props.onLog({ password, email });
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
          <h1 className={"log__title"}>Рады видеть!</h1>
          <form
            className={"log__form"}
            id={"loginform"}
            method={"post"}
            onSubmit={handleSubmit}
          >
            <div className={"log__input-container"}>
              <label htmlFor={"nameUser"} className={"log__label"}>
                E-mail
              </label>
              <input
                type={"text"}
                className={"log__input" + (formErrors.email ? " error" : "")}
                name={"email"}
                id={"emailser"}
                minLength={"2"}
                maxLength={"40"}
                required
                placeholder="E-mail"
                value={formValue.email}
                onChange={handleChange}
              />
              <span className="error">{formErrors.email}</span>
            </div>
            <div className={"log__input-container"}>
              <label htmlFor={"passwordUser"} className={"log__label"}>
                Пароль
              </label>
              <input
                type={"password"}
                className={"log__input" + (formErrors.password ? " error" : "")}
                name={"password"}
                id={"passwordUser"}
                minLength={"2"}
                maxLength={"40"}
                required
                placeholder="Пароль"
                value={formValue.password}
                onChange={handleChange}
              />
              <span className="error">{formErrors.password}</span>
            </div>
            <button
              type={"submit"}
              id={"log"}
              className={`log__button-signin ${isValid || props.isSubmitting ? "" : "log__button-form_disabled"}`}
              disabled={!isValid || props.isSubmitting}
            >
              Войти
            </button>
          </form>
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

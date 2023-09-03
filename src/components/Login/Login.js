import React from "react";

import logo from '../../images/logo.png'

const Login = () => {
  return (
    <section className='log'>
      <div className="log__container">
        <img src={logo} className="log__logo" />
        <h1 className="log__title">
          Рады видеть!
        </h1>
        <form className='log__form' id="loginform" method="post">
          <input type='email'
            className='log__input from__input_email_value'
            name='email'
            id='emailUser'
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
          />
          <input type='password'
            className='log__input from__i nput_password_value'
            name='password'
            id='passwordUser'
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            required
          />
        </form>
        <button type="submit" id="log"
          className="log__button-form">Войти</button>

        <p className='log__link' to='/sign-in'>Ещё не зарегистрированы? <span className="logo__link-signin"> Регистрация </span></p>
      </div>
    </section>
  )
}

export default Login
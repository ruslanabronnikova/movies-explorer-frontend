import React from "react";

import './Register.css'
import logo from '../../images/logo.png'

const Register = () => {
  return (
    <section className='log'>
      <div className="log__container">
        <img src={logo} className="log__logo" />
        <h1 className="log__title">
          Добро пожаловать!
        </h1>
        <form className='log__form' id="loginform" method="post">
          <input type='name'
            className='log__input from__input_email_value'
            name='name'
            id='nameUser'
            label='Имя'
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />

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
            className='log__input from__input_password_value'
            name='password'
            id='passwordUser'
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            required
          />
        </form>
        <button type="submit" id="log"
          className="log__button-form">Зарегистрироваться</button>

        <p className='log__link' to='/sign-in'>Уже зарегистрированы? <span className="logo__link-signin"> Войти </span></p>
      </div>
    </section>
  )
}
 
export default Register
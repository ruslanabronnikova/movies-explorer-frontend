import React, { useState, useEffect } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { useNavigate, Link } from 'react-router-dom';
import api from "../../utils/MainApi";

const Profile = ({ currentUser }) => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
  });
  const [isValid, setIsValid] = useState(true); // Изначально считаем форму валидной, так как начальные значения уже установлены
  const navigate = useNavigate();

  // Функция для загрузки данных пользователя и обновления состояния
  const loadUserInfo = () => {
    setIsSaving(true);
    api.getUserInfo()
      .then((userInfo) => {
        setName(userInfo.user.name);
        setEmail(userInfo.user.email);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
        // Обработка ошибок
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  // Вызывайте функцию загрузки данных пользователя при монтировании компонента
  useEffect(() => {
    loadUserInfo();
  }, []);

  function handleOut() {
    localStorage.removeItem('JWT');
    navigate('/');
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsSaving(true);

    // Валидируйте каждое поле перед сохранением
    validateField("name", name);
    validateField("email", email);

    // Проверьте, прошла ли валидация
    if (isValid) {
      // Выводим данные перед отправкой
      console.log('Данные перед отправкой:', { name, email });

      api.updateUser({ name, email })
        .then((updatedUser) => {
          setName(updatedUser.name);
          setEmail(updatedUser.email);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error('Ошибка при обновлении данных пользователя:', error);
        })
        .finally(() => {
          setIsSaving(false);
        });
    } else {
      // Валидация не прошла, не выполняйте сохранение
      setIsSaving(false);
    }
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
      default:
        break;
    }

    setFormErrors(errors);
    setIsValid(Object.values(errors).every((error) => error === ""));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <Header />
      <main>
        <section className={"prof"}>
          <h1 className={"prof__title"}>Привет, {name}!</h1>
          <form className={"prof__form"} id="profileform" method="post">
            <div className={"prof__text-container"}>
              <p className={"prof__name"}>Имя</p>
              {isEditing ? (
                <>
                  <input
                    className={"prof__input"}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </>
              ) : (
                <p className={"prof__name"}>{name}</p>
              )}
            </div>
            <span className="error">{formErrors.name}</span>
            <div className={"prof__text-container"}>
              <p className={"prof__name"}>E-mail</p>
              {isEditing ? (
                <>
                  <input
                    className={"prof__input"}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              ) : (
                <p className={"prof__name"}>{email}</p>
              )}
            </div>
            <span className="error">{formErrors.email}</span>
          </form>
          <div className={"prof__btns"}>
            {isEditing ? (
              <button
                type="button"
                className={"prof__button"}
                onClick={handleSaveClick}
                disabled={!isValid}
              >
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </button>
            ) : (
              <button
                type="button"
                className={"prof__button"}
                onClick={handleEditClick}
              >
                Редактировать
              </button>
            )}
            <button type="submit" className={"prof__button"} onClick={handleOut}>
              <Link to="/">Выйти из аккаунта</Link>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;

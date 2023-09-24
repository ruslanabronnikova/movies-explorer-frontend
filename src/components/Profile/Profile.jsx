import React, { useState, useEffect } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { useNavigate, Link } from 'react-router-dom';
import api from "../../utils/MainApi";

import { useUser } from "../../contexts/UserProvider";

const Profile = () => {
  const { currentUser } = useUser();

  const [successMessage, setSuccessMessage] = useState("");
  const [unsuccessMessage, setUnSuccessMessage] = useState("");

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
  });

  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const loadUserInfo = () => {
    setIsSaving(true);
    api.getUserInfo()
      .then((userInfo) => {
        setName(userInfo.user.name);
        setEmail(userInfo.user.email);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  function handleOut() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsSaving(true);

    validateField("name", name);
    validateField("email", email);

    if (isValid) {
      api.updateUser({ name, email })
        .then((updatedUser) => {
          setName(updatedUser.name);
          setEmail(updatedUser.email);
          setIsEditing(false);
          setSuccessMessage("Данные успешно сохранены!"); 
          setTimeout(() => setSuccessMessage(""), 3000); 
        })
        .catch((error) => {
          console.error('Ошибка при обновлении данных пользователя:', error);
          setUnSuccessMessage("При обновлении профиля произошла ошибка.")
          setTimeout(() => setUnSuccessMessage(""), 3000);
        })
        .finally(() => {
          setIsSaving(false);
        });
    } else {
      setIsSaving(false);
    }
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case "name":
        if (!value.trim()) {
          errors.name = "Поле 'Имя' обязательно для заполнения";
        } else if (value.length < 2 || value.length > 30) {
          errors.name = "Имя должно содержать от 2 до 30 символов";
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
                    onChange={(e) => {
                      setName(e.target.value);
                      validateField("name", e.target.value);
                    }}
                  />
                </>
              ) : (
                <p className={"prof__name"}>{name}</p>
              )}
            </div>
            <span className="error">{formErrors.name}</span>
            <hr className="prof__line-input" />
            <div className={"prof__text-container"}>
              <p className={"prof__name"}>E-mail</p>
              {isEditing ? (
                <>
                  <input
                    className={"prof__input"}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateField("email", e.target.value);
                    }}
                  />
                </>
              ) : (
                <p className={"prof__name"}>{email}</p>
              )}
            </div>
            <span className="error">{formErrors.email}</span>
          </form>
          <div className={"prof__btns"}>
            {successMessage && (
              <p className="prof__success-message">{successMessage}</p>
            )}
            {unsuccessMessage && (
              <p className="prof__unsuccess-message">{unsuccessMessage}</p>
            )}
            {isEditing ? (
              <button
                type="button"
                className={`prof__button-save ${isValid ? "" : "prof__button-save_disabled"}`}
                onClick={handleSaveClick}
                disabled={!isValid || isSaving}
              >
                Сохранить
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

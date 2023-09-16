import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const Profile = () => {
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru");
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <section className={"prof"}>
        <h1 className={"prof__title"}>Привет, {name}!</h1>
        <form className={"prof__form"} id="profileform" method="post">
          <div className={"prof__text-container"}>
            <p className={"prof__name"}>Имя</p>
            {isEditing ? (
              <input
                className={"prof__input"}
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p className={"prof__name"}>{name}</p>
            )}
          </div>
          <div className={"prof__text-container"}>
            <p className={"prof__name"}>E-mail</p>
            {isEditing ? (
              <input
                className={"prof__input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p className={"prof__name"}>{email}</p>
            )}
          </div>
        </form>
        <div className={"prof__btns"}>
          {isEditing ? (
            <button
              type="button"
              className={"prof__button"}
              onClick={handleSaveClick}
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
          <button type="submit" className={"prof__button"}>
            <Link to="/">Выйти из аккаунта</Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;

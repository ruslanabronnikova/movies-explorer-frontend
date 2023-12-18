import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Этот метод вернет пользователя на предыдущую страницу
  };

  return (
    <main>
      <section className={"notfound__container"}>
        <h1 className={"notfound__title"}>404</h1>
        <p className={"notfound__subtitle"}>Страница не найдена</p>
        <button onClick={handleGoBack} className={"notfound__link"}>
          Назад
        </button>
      </section>
    </main>
  );
};

export default NotFound;

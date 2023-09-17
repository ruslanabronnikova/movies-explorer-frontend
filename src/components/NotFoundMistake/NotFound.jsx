import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <section className={"notfound__container"}>
        <h1 className={"notfound__title"}>404</h1>
        <p className={"notfound__subtitle"}>Страница не найдена</p>
        <Link to="/" className={"notfound__link"}>
          Назад
        </Link>
      </section>
    </main>
  );
};

export default NotFound;

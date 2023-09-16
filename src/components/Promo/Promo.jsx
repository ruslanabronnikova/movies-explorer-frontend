import React from "react";
import "./Promo.css";
import NavTab from "../NavTab/NavTab";

const Promo = () => {
  return (
    <section className={"promo__main"}>
      <h1 className={"promo__title"}>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab />
    </section>
  );
};

export default Promo;

import React from "react";
import './AboutMe.css';
import imgStudent from '../../images/student.png';
import Portfolio from "../Portfolio/Portfolio";
import { works } from "../../utils/constants";

const AboutMe = () => {
  return (
    <section className={"aboutme"} id="student">
      <h2 className={"aboutme__title"}>
        Студент
      </h2>
      <div className={"aboutme__container"}>
        <div className={"aboutme__container-info"}>
          <h3 className={"aboutme__container-title"}>
            Руслана
          </h3>
          <p className={"aboutme__container-work"}>
            Фронтенд-разработчик, 21 год
          </p>
          <p className={"aboutme__container-text"}>
            Привет! Я студентка 4 курса, увлеченная IT. Вот уже 2 года я занимаюсь веб-дизайном и программированием.
            Моя страсть к спорту помогает поддерживать баланс, и я горжусь тем, что могу быть и дизайнером, и
            фронтенд разработчиком, сочетая творчество и кодирование.
          </p>
          <a className={"aboutme__container-portfolio"} href="https://github.com/ruslanabronnikova" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </div>
        <img className={"aboutme__container-photo"} src={imgStudent} alt="Фото студента" />
      </div>
      <h4 className={"aboutme__portfolio-title"}>
        Портфолио
      </h4>
      <ul className={"aboutme__portfolio-works"}>
        {works.map((work) => (
          <Portfolio key={work.id} {...work} />
        ))}
      </ul>
    </section>
  )
}

export default AboutMe;

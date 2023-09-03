import React from "react";

import './AboutMe.css'
import imgStudent from '../../images/srudent.png';
import Portfolio from "../Portfolio/Portfolio";
import { works } from "../../utils/constants";

const AboutMe = () => {
  return (
    <section className="aboutme" id="student">
      <h2 className="aboutme__title">
        Студент
      </h2>
      <div className="aboutme__container">
        <div className="aboutme__container-info">
          <h3 className="aboutme__container-title">
            Руслана
          </h3>
          <p className="aboutme__container-work">
            Фронтенд-разработчик, 21 год
          </p>
          <p className="aboutme__container-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className="aboutme__container-portfolio">
            Github
          </p>
        </div>
        <img className="aboutme__container-photo" src={imgStudent} alt="Фото студента" />
      </div>
      <h4 className="porfolio__title">
        Портфолио
      </h4>
      <ul className="portfolio__works">
        {works.map((works) => (
          <Portfolio key={works.id} {...works} />
        ))}
      </ul>
    </section>
  )
}

export default AboutMe
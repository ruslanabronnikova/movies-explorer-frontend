import React from "react";
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className={"project"} id="aboutproject">
      <h2 className={"project__title"}>
        О проекте
      </h2>
      <div className={"project__container-about"}>
        <div className={"project__about"}>
          <h3 className={"project__about-title"}>
            Дипломный проект включал 5 этапов
          </h3>
          <p className={"project__about-subtitle"}>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>

        <div className={"project__about"}>
          <h3 className={"project__about-title"}>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className={"project__about-subtitle"}>
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className={"project__container-time"}>
        <div className={"project__time-back"}>
          <h4 className={"project__time-title"}>
            1 неделя
          </h4>
          <p className={"project__time-subtitle"}>
            Back-end
          </p>
        </div>

        <div className={"project__time-front"}>
          <h4 className={"project__time-title project__time-title_type_ligth"}>
            4 недели
          </h4>
          <p className={"project__time-subtitle"}>
            Front-end
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

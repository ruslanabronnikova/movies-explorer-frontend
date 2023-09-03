import React from "react";

import './Techs.css'

const Techs = () => {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">
        Технологии
      </h2>

      <h3 className="techs__title-page">7 технологий</h3>
      <p className="techs__subttile">На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.
      </p>

      <ul className="techs__container">
        <li className="techs__name">
          <p className="techs__name-title">
            HTML
          </p>
        </li>
        <li className="techs__name">
          <p className="techs__name-title">
            CSS
          </p>
        </li>
        <li className="techs__name">
          <p className="techs__name-title">
            JS
          </p>
        </li>
        <li className="techs__name">
          <p className="techs__name-title">
            React
          </p>
        </li>
        <li className="techs__name">
          <p className="techs__name-title">
            Git
          </p>
        </li>
        <li className="techs__name">
          <p className="techs__name-title">
            Express.js
          </p>
        </li>
        <li className="techs__name">
          <p className="techs__name-title">
            mongoDB
          </p>
        </li>
      </ul>
    </section>
  )
}

export default Techs
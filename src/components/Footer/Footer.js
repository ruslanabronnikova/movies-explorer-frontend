import React from "react";

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__nav">
        <p className="footer__year">
          © 2020
        </p>
        <div className="footer__links">
          <a href="/" className="footer__linkOne">Яндекс.Практикум</a>
          <a href="/" className="footer__linkTwo">Github</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
import React from "react";
import "./NavTab.css";

const NavTab = () => {
  return (
    <nav className={"navtab"}>
      <ul className={"navtab__container"}>
        <li>
          <a href="#aboutproject" className={"navtab__url"}>
            <p className={"navtab__name"}>
              О проекте
            </p>
          </a>
        </li>
        <li>
          <a href="#techs" className={"navtab__url"}>
            <p className={"navtab__name"}>
              Технологии
            </p>
          </a>
        </li>
        <li>
          <a href="#student" className={"navtab__url"}>
            <p className={"navtab__name"}>
              Студент
            </p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;

import React from "react";

import './FilterCheckbox.css'

const FilterCheckbox = () => {
  return (
    <label className="filter">
      <input className="filter__input" type="checkbox" id="filter-input"/>
      <div className="filter__name">
        <p className="filter__text">Короткометражки</p>
      </div>
    </label>
  )
}
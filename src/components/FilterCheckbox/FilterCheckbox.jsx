import React from "react";
import './FilterCheckbox.css';

const FilterCheckbox = ({ setIsShortFilterActive }) => {
  const [checked, setChecked] = React.useState(false);

  function changeCheckbox() {
    setChecked(!checked);
    setIsShortFilterActive(!checked); // Инвертируем значение состояния короткометражных фильмов
  }

  return (
    <label className={"filter-switch"}>
      <input
        className={"filter-switch__input"}
        type="checkbox"
        onChange={changeCheckbox}
        checked={checked}
      />
      <span className={"filter-switch__slider"}></span>
      <p className={"filter-switch__label"}>Короткометражки</p>
    </label>
  );
}

export default FilterCheckbox;

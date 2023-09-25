import React, { useEffect } from "react";
import './FilterCheckbox.css';

const FilterCheckbox = ({ setIsShortFilterActive, isChecked }) => {
  const [checked, setChecked] = React.useState(false);

  function changeCheckbox() {
    setChecked(!checked);
    setIsShortFilterActive(!checked); // Инвертируем значение состояния короткометражных фильмов
  }

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked])

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

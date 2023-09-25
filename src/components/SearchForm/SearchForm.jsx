import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import BtnSearchIcon from "../IconUi/BtnSearchIcon";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({ onSearch, setIsShortFilterActive, searchString, isShortFilterActive }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryError, setSearchQueryError] = useState(""); // Добавляем состояние для ошибки

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchQueryError(""); // Сбрасываем ошибку при изменении ввода
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchQueryError("Поле 'Фильм' обязательно для заполнения");
    } else {
      onSearch(searchQuery);
    }
  };

  useEffect(() => {
    setSearchQuery(searchString)
  }, [searchString])

  return (
    <section className={"search"}>
      <form className={"search__form"} onSubmit={handleFormSubmit} noValidate>
        <div className={"search__from-container"}>
          <input
            className={"search__input"}
            type="text"
            id="search-input"
            placeholder="Фильм"
            required
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button type="submit" className={"search__button"}>
            <BtnSearchIcon />
          </button>
        </div>
        {searchQueryError && (
          <span className="search__error">{searchQueryError}</span>
        )} 
        <div className={"search__filter"}>
          <FilterCheckbox setIsShortFilterActive={setIsShortFilterActive} isChecked={isShortFilterActive} />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;

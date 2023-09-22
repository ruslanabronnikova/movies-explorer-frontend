import React, { useState } from "react";
import "./SearchForm.css";
import BtnSearchIcon from "../IconUi/BtnSearchIcon";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({ onSearch, setIsShortFilterActive }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Передаем поисковый запрос в родительский компонент
  };

  return (
    <section className={"search"}>
      <form className={"search__form"} onSubmit={handleFormSubmit}>
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
        <div className={"search__filter"}>
          <FilterCheckbox setIsShortFilterActive={setIsShortFilterActive} />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;

import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import BtnSearchIcon from "../IconUi/BtnSearchIcon";

const SearchForm = () => {
  return (
    <section className={"search"}>
      <form className={"search__form"}>
        <div className={"search__from-container"}>
          <input
            className={"search__input"}
            type="text"
            id="search-input"
            placeholder="Фильм"
          />
          <button type="submit" className={"search__button"}>
            <BtnSearchIcon />
          </button>
        </div>
        <div className={"search__filter"}>
          <FilterCheckbox />
        </div>
      </form>
      <hr className={"search__filter-line"} />
    </section>
  );
};

export default SearchForm;

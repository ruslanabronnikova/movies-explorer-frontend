import React from "react";

import './SearchForm.css';


const SearchFrom = () => {
  return (
    <section className="search">
      <form className="search__form">
        <input className="search__input" type="text" id="search-input" placeholder="Фильм" />
        <button className="search__button"></button>
      </form>
      <div className="search__filters">
      </div>
    </section>
  )
}

export default SearchFrom;
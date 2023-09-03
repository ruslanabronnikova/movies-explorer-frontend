import React from "react";

import './SearchForm.css';


const SearchFrom = () => {
  return (
    <section className="search">
      <form className="search-form">
        <input className="search-input" type="text" id="search-input" placeholder="Фильм" />
      </form>
      <button className="search-button"></button>
    </section>
  )
}

export default SearchFrom;
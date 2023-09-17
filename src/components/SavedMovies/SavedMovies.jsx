import React from "react";

import SearchFrom from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { data } from "../../utils/constants";

const SavedMovies = () => {
  return (
    <>
      <Header />
      <main>
        <SearchFrom />
        <MoviesCards data={data.saveMoviesData} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

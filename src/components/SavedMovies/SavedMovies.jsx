import React from "react";

import SearchFrom from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCardList/MoviesCardList";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { data } from "../../utils/constants";

const SavedMovies = () => {
  return (
    <>
      <Header />
      <SearchFrom />
      <MoviesCards data={data.saveMoviesData} />
      <Footer />
    </>
  )
}

export default SavedMovies
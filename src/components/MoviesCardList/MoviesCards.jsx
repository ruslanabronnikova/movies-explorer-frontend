import React from "react";

import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { data } from "../../utils/constants";

const MoviesCards = () => {
  return (
    <>
      <Header />
      <SearchFrom />
      <MoviesCardList data={data.moviesData}/>
      <Footer />
    </>
  )
}

export default MoviesCards
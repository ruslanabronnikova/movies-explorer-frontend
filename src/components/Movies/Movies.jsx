import React from "react";

import SearchFrom from "../SearchForm/SearchForm";
import MoviesCards from "../MoviesCards/MoviesCards";
import { data } from "../../utils/constants";

const Main = () => {
  return (
    <>
      <SearchFrom />
      <MoviesCards data={data.moviesData} />
    </>
  );
};
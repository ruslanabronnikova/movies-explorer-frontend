import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import apiMovie from "../../utils/MoviesApi";

const MoviesCards = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilterActive, setIsShortFilterActive] = useState(false);

  useEffect(() => {
    apiMovie
      .getMovies()
      .then((data) => {
        setMoviesData(data);
        setFilteredMovies(data); // Начально отображаем все фильмы
      })
      .catch((error) => {
        console.error("Ошибка при получении фильмов:", error);
      });
  }, []);

  const handleSearch = (searchQuery) => {
    // Фильтруем фильмы по поисковому запросу
    let filtered = moviesData.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Если фильтр короткометражных фильмов активен, применяем фильтрацию
    if (isShortFilterActive) {
      filtered = applyShortFilter(filtered);
    }

    setFilteredMovies(filtered);
  };

  const applyShortFilter = (movies) => {
    return movies.filter((movie) => movie.duration <= 50); // Примерное значение для короткометражных фильмов
  };

  return (
    <>
      <Header />
      <main>
        <SearchForm onSearch={handleSearch} setIsShortFilterActive={setIsShortFilterActive} />
        <MoviesCardList data={filteredMovies}  />
      </main>
      <Footer />
    </>
  );
};

export default MoviesCards;

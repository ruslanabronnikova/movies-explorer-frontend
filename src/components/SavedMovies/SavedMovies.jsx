import React, { useState, useEffect } from "react";
import SearchFrom from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MainApi from "../../utils/MainApi"; // Импортируйте ваш класс для работы с API

const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilterActive, setIsShortFilterActive] = useState(false);

  useEffect(() => {
    MainApi.getMovies()
      .then((movies) => {
        console.log("получения гет", movies)
        setSavedMovies(movies);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке сохраненных фильмов:", error);
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
    return movies.filter((movie) => movie.duration <= 40); // Примерное значение для короткометражных фильмов
  };

    // Обработчик удаления фильма
    const handleRemoveMovie = (movieId) => {
      // Удалите фильм из localStorage
      const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== movieId);
      localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      
      // Обновите состояние savedMovies
      setSavedMovies(updatedSavedMovies);
    };

  return (
    <>
      <Header />
      <main>
        <SearchFrom onSearch={handleSearch} setIsShortFilterActive={setIsShortFilterActive} />
        <MoviesCardList data={savedMovies} isSaved={true} isSavedPage={true} updateMovieLikedStatus={handleRemoveMovie} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

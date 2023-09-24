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

  const [searchResultsFound, setSearchResultsFound] = useState(true);

  const [isSearchPerformed, setIsSearchPerformed] = useState(false);


  // Функция для выполнения запроса к API при поиске
  const fetchMovies = (searchQuery) => {
    apiMovie
      .getMovies()
      .then((data) => {
        setMoviesData(data);
        // Фильтруем результаты по поисковому запросу
        const filtered = data.filter((movie) =>
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Если фильтр короткометражных фильмов активен, применяем фильтрацию
        if (isShortFilterActive) {
          setFilteredMovies(applyShortFilter(filtered));
        } else {
          setFilteredMovies(filtered);
        }

        // Сохраняем результаты поиска в localStorage
        localStorage.setItem("searchResults", JSON.stringify(filtered));

        // Проверяем, были ли найдены результаты
        setSearchResultsFound(filtered.length > 0);
      })
      .catch((error) => {
        console.error("Ошибка при получении фильмов:", error);
      });
  };

  useEffect(() => {
    // Проверяем, есть ли результаты поиска в localStorage
    const savedSearchResults = localStorage.getItem("searchResults");
    if (savedSearchResults) {
      setMoviesData(JSON.parse(savedSearchResults));
      setFilteredMovies(JSON.parse(savedSearchResults));
    }
  }, []);

  const handleSearch = (searchQuery) => {
    // Выполняем запрос к API при поиске
    fetchMovies(searchQuery);
    setIsSearchPerformed(true); // Устанавливаем, что поиск был выполнен
  };

  const applyShortFilter = (movies) => {
    return movies.filter((movie) => movie.duration <= 50); // Примерное значение для короткометражных фильмов
  };

  return (
    <>
      <Header />
      <main>
        <SearchForm onSearch={handleSearch} setIsShortFilterActive={setIsShortFilterActive} />
        {isSearchPerformed && !searchResultsFound ? (
          <p className={"movies-card-list__search-nothing"}>Ничего не найдено</p>
        ) : (
          <MoviesCardList data={filteredMovies} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default MoviesCards;

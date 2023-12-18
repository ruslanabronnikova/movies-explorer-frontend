import React, { useState, useEffect } from 'react';
import SearchFrom from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const SavedMovies = ({ getSavedMovies }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilterActive, setIsShortFilterActive] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке сохраненных фильмов:', error);
      });
  }, []);

  const filterMovies = (searchQuery) => {
    let filtered = savedMovies;

    if (searchQuery) {
      filtered = savedMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Если фильтр короткометражных фильмов активен, применяем фильтрацию
    if (isShortFilterActive) {
      filtered = applyShortFilter(filtered);
    }

    setFilteredMovies(filtered);
    // Проверяем, есть ли результаты поиска
    setNoResults(filtered.length === 0);
  };

  useEffect(() => {
    filterMovies(searchQuery);
  }, [isShortFilterActive, savedMovies]);

  const handleSearch = (searchQuery) => {
    // Фильтруем сохраненные фильмы по поисковому запросу
    setSearchQuery(searchQuery);
    filterMovies(searchQuery);
  };

  const applyShortFilter = (movies) => {
    return movies.filter((movie) => movie.duration <= 50);
  };

  // Обработчик удаления фильма
  const handleRemoveMovie = (movieId) => {
    // Удалите фильм из localStorage
    const updatedSavedMovies = savedMovies.filter(
      (savedMovie) => savedMovie._id !== movieId
    );
    localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));

    // Обновите состояние savedMovies
    setSavedMovies(updatedSavedMovies);
  };

  return (
    <>
      <Header />
      <main>
        <SearchFrom
          onSearch={handleSearch}
          setIsShortFilterActive={setIsShortFilterActive}
        />
        {noResults ? (
          <p className="movies-card-list__search-nothing">Ничего не найдено</p>
        ) : (
          <MoviesCardList
            data={filteredMovies}
            isSaved={true}
            isSavedPage={true}
            updateMovieLikedStatus={handleRemoveMovie}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

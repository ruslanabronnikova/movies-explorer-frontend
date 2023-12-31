import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

const MoviesCards = ({ getSavedMovies, getAllMovies, savedMovies }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilterActive, setIsShortFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateMoviesForSaved = (movies, savedData) => {
    return movies.map((movie) => {
      const savedItems = savedData.filter(
        (savedMovie) => movie.id === savedMovie.movieId
      );
      if (savedItems.length > 0) {
        return savedItems[0];
      }
      return movie;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    let savedData = [];
    getSavedMovies()
      .then((data) => {
        savedData = data;
        localStorage.setItem('savedMovies', JSON.stringify(data));
        return getAllMovies();
      })
      .then((data) => {
        const updatedData = updateMoviesForSaved(data, savedData);
        setMoviesData(updatedData);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false); // Закончить отображать Preloader
      });
  }, [getSavedMovies, getAllMovies]);

  useEffect(() => {
    const savedSearchResults = localStorage.getItem('searchResults');
    const savedQuery = localStorage.getItem('searchQuery');
    const saveCheckBox = localStorage.getItem('isShort')

    if (savedSearchResults) {
      setFilteredMovies(JSON.parse(savedSearchResults));
      setIsSearchPerformed(true);
    }

    if (savedQuery) {
      setSearchQuery(savedQuery);
    }

    if (saveCheckBox) {
      setIsShortFilterActive(true);
    }

  }, []);


  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setIsSearchPerformed(true);

    // Проверяем, что найдены фильмы
    const filtered = moviesData.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filtered.length > 0) {
      // Сохраняем результаты поиска в localStorage
      localStorage.setItem('searchResults', JSON.stringify(filtered));
      localStorage.setItem('searchQuery', searchQuery);
    }
  };


  useEffect(() => {
    if (!isSearchPerformed) {
      return;
    }

    let filtered = moviesData.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isShortFilterActive) {
      filtered = applyShortFilter(filtered);
      localStorage.setItem('isShort', 'true')
    } else {
      localStorage.removeItem('isShort');
    }

    if (filtered.length > 0) {
      setFilteredMovies(filtered);
      // Сохранять результаты поиска в localStorage только если есть результаты
      localStorage.setItem('searchResults', JSON.stringify(filtered));
      localStorage.setItem('searchQuery', searchQuery);
    }
    else {
      setFilteredMovies([]);
      // Очищаем localStorage, если результатов поиска нет
      localStorage.removeItem('searchResults');
      localStorage.removeItem('searchQuery');
    }
  }, [isSearchPerformed, searchQuery, moviesData, isShortFilterActive]);



  const applyShortFilter = (movies) => {
    return movies.filter((movie) => movie.duration <= 50);
  };

  const handleRemoveMovie = (movieId) => {
    const updatedSavedMovies = savedMovies.filter(
      movie => movie._id !== movieId
    );
    localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
  };

  return (
    <>
      <Header />
      <main>
        <SearchForm
          onSearch={handleSearch}
          setIsShortFilterActive={setIsShortFilterActive}
          searchString={searchQuery}
          isShortFilterActive={isShortFilterActive}
        />
        {isLoading ? (
          <Preloader /> // Отображать Preloader во время загрузки
        ) : isSearchPerformed && filteredMovies.length === 0 ? (
          <p className={"movies-card-list__search-nothing"}>Ничего не найдено</p>
        ) : (
          <MoviesCardList
            data={filteredMovies}
            updateMovieLikedStatus={handleRemoveMovie}
            savedMovies={savedMovies}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default MoviesCards;

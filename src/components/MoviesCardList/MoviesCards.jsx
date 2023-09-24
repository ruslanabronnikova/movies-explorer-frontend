import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MoviesCards = ({ getSavedMovies, getAllMovies }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilterActive, setIsShortFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

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
      .catch((error) => {
        console.error('Ошибка при получении фильмов:', error);
      });
  }, [getSavedMovies, getAllMovies]);

  useEffect(() => {
    const savedSearchResults = localStorage.getItem('searchResults');
    const savedQuery = localStorage.getItem('searchQuery');
  
    if (savedSearchResults) {
      setFilteredMovies(JSON.parse(savedSearchResults));
      setIsSearchPerformed(true);
    }
  
    if (savedQuery) {
      setSearchQuery(savedQuery);
    }
  }, []);
  
  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setIsSearchPerformed(true);
  
    // Сохраняем поисковый запрос в localStorage
    localStorage.setItem('searchQuery', searchQuery);
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
    }
  
    setFilteredMovies(filtered);
  
    // Сохраняем результаты поиска в localStorage
    localStorage.setItem('searchResults', JSON.stringify(filtered));
    localStorage.setItem('searchQuery', searchQuery);
  }, [isSearchPerformed, searchQuery, moviesData, isShortFilterActive]);
  

  const applyShortFilter = (movies) => {
    return movies.filter((movie) => movie.duration <= 50);
  };

  const handleRemoveMovie = (movieId) => {
    const updatedSavedMovies = moviesData.filter(
      (movie) => movie._id !== movieId
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
        />
        {isSearchPerformed && filteredMovies.length === 0 ? (
          <p className={"movies-card-list__search-nothing"}>Ничего не найдено</p>
        ) : (
          <MoviesCardList
            data={filteredMovies}
            updateMovieLikedStatus={handleRemoveMovie}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default MoviesCards;

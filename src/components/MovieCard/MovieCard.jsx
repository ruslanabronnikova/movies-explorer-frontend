import React, { useState, useEffect } from 'react';
import './MovieCard.css';

import MainApi from '../../utils/MainApi';

import SaveIcon from '../IconUi/SaveIcon';
import DelIcon from '../IconUi/DelIcon';

const MovieCard = ({ movie, isSavedPage, updateMovieLikedStatus }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [movieState, setMovieState] = useState(movie);

  useEffect(() => {
    // При монтировании компонента, проверьте, сохранена ли карточка в localStorage
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    const isMovieSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.id
    );
    setIsLiked(isMovieSaved);
    console.log(savedMovies);
  }, [movie]);

  // Изменим имя функции на formatMovieDuration
  const formatMovieDuration = () => {
    if (movie.duration < 60) {
      return `${movie.duration % 60}м`;
    } else {
      return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    }
  };

  const handleSaveClick = () => {
    if (isLiked) {
      // Если карточка уже добавлена, то выполняем удаление
      MainApi.deleteMovieId(movieState._id)
        .then(() => {
          setIsLiked(false);
          const savedMovies =
            JSON.parse(localStorage.getItem('savedMovies')) || [];
          const updatedSavedMovies = savedMovies.filter(
            (savedMovie) => savedMovie._id !== movieState._id
          );
          localStorage.setItem(
            'savedMovies',
            JSON.stringify(updatedSavedMovies)
          );
          if (updateMovieLikedStatus) {
            updateMovieLikedStatus(movieState._id, false);
          }
        })
        .catch((error) => {
          console.error('Ошибка при удалении фильма:', error);
        });

    } else {
      // Если карточка не добавлена, то выполняем сохранение
      MainApi.createMovie(movieState)
        .then((newMovie) => {
          console.log(newMovie);
          setMovieState(newMovie);
          setIsLiked(true);
          const savedMovies =
            JSON.parse(localStorage.getItem('savedMovies')) || [];
          savedMovies.push(newMovie);
          console.log(savedMovies);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
          if (updateMovieLikedStatus) {
            updateMovieLikedStatus(newMovie._id, true);
          }
        })
        .catch((error) => {
          console.error('Ошибка при сохранении фильма:', error);
        });
    }
  };

  const handleRemoveClick = () => {
    MainApi.deleteMovieId(movieState._id)
      .then(() => {
        setIsLiked(false);
        const savedMovies =
          JSON.parse(localStorage.getItem('savedMovies')) || [];
        const updatedSavedMovies = savedMovies.filter(
          (savedMovie) => savedMovie._id !== movieState._id
        );
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        if (updateMovieLikedStatus) {
          updateMovieLikedStatus(movieState._id, false);
        }
      })
      .catch((error) => {
        console.error('Ошибка при удалении фильма:', error);
      });
  };

  const image_url = movie.image.url
    ? 'https://api.nomoreparties.co' + movie.image.url
    : movie.image;

  return (
    <li className={'movie-card'}>
      <div className={'movie-card__saved-flag'}>
        {isSavedPage ? ( // Если на странице "Сохраненные фильмы", отображаем иконку удаления
          <button
            type="button"
            className={'movie-card__del-button'}
            onClick={handleRemoveClick}
          >
            <DelIcon />
          </button>
        ) : (
          <>
            {isLiked ? (
              <button
                type="button"
                className={'movie-card__del-button'}
                onClick={handleSaveClick}
              >
                <SaveIcon />
              </button>
            ) : (
              <button
                type="button"
                className={'movie-card__save-button'}
                onClick={handleSaveClick}
              >
                Сохранить
              </button>
            )}
          </>
        )}
      </div>
      <a
        className={'movie-card__link'}
        target="_blank"
        rel="noreferrer"
        href={movie.trailerLink}
      >
        <img
          src={image_url}
          className={'movie-card__image'}
          alt={movie.nameRU}
        />
      </a>
      <div className={'movie-card__content'}>
        <h2 className={'movie-card__title'}>{movie.nameRU}</h2>
        <p className={'movie-card__duration'}>{formatMovieDuration()}</p>
      </div>
    </li>
  );
};

export default MovieCard;

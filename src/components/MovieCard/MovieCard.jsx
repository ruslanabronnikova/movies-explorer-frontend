// MovieCard.jsx
import React from "react";
import "./MovieCard.css";

import MainApi from '../../utils/MainApi';

import SaveIcon from "../IconUi/SaveIcon";
import DelIcon from "../IconUi/DelIcon";

const MovieCard = ({ movie, isSavedPage, updateMovieLikedStatus }) => {
  const [isLiked, setIsLiked] = React.useState(movie.isLiked);

  // Изменим имя функции на formatMovieDuration
  const formatMovieDuration = () => {
    if (movie.duration < 60) {
      return `${movie.duration % 60}м`;
    } else {
      return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    }
  };


  const handleSaveClick = () => {
    console.log('данные перед отправкой', movie);
    
    debugger
    MainApi.createMovie(movie)
      .then((movie) => {
        // Обновление состояния isLiked в локальном хранилище
        setIsLiked(true);
        // Добавление фильма в массив сохраненных фильмов в локальном хранилище
        const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
        savedMovies.push(movie._id);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((error) => {
        console.error("Ошибка при сохранении фильма:", error);
      });
  };
  

  const image_url = movie.image.url ? 'https://api.nomoreparties.co' + movie.image.url : movie.image;

  return (
    <li className={"movie-card"}>
      <div className={"movie-card__saved-flag"}>
        {isSavedPage ? ( // Если на странице "Сохраненные фильмы", отображаем иконку удаления
          <button type="button" className={"movie-card__save-button"} onClick={handleSaveClick}>
            <DelIcon />
          </button>
        ) : (
          <button type="button" className={"movie-card__save-button"} onClick={handleSaveClick}>
            {isLiked ? <SaveIcon /> : 'Сохранить'} {/* Отображаем иконку в зависимости от состояния isLiked */}
          </button>
        )}
      </div>
      <a
        className={"movie-card__link"}
        target="_blank"
        rel="noreferrer"
        href={movie.trailerLink}
      >
        <img
          src={image_url}
          className={"movie-card__image"}
          alt={movie.nameRU}
        />
      </a>
      <div className={"movie-card__content"}>
        <h2 className={"movie-card__title"}>{movie.nameRU}</h2>
        <p className={"movie-card__duration"}>
          {formatMovieDuration()}
        </p>
      </div>
    </li>
  );
};

export default MovieCard;

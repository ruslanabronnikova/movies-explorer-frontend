// MovieCard.jsx
import React from "react";
import "./MovieCard.css";
import SaveIcon from "../IconUi/SaveIcon";

const MovieCard = ({ movie, isSaved }) => {
  const isLiked = !isSaved && movie.isLiked;

  // Изменим имя функции на formatMovieDuration
  const formatMovieDuration = () => {
    if (movie.duration < 60) {
      return `${movie.duration % 60}м`;
    } else {
      return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    }
  };

  return (
    <li className={"movie-card"}>
      <div className={"movie-card__saved-flag"}>
        {!isSaved ? (
          <button type="button" className={"movie-card__save-button"}>
            {isLiked ? "Удалить" : "Сохранить"}
          </button>
        ) : (
          <span className={"movie-card__saved-checkmark"}>
            <SaveIcon />
          </span>
        )}
      </div>
      <a
        className={"movie-card__link"}
        target="_blank"
        rel="noreferrer"
        href={movie.trailerLink}
      >
        <img
          src={`${"https://api.nomoreparties.co"}${movie.image.url}`}
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

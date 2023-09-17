import React from "react";
import "./MovieCard.css";
import SaveIcon from "../IconUi/SaveIcon";

const MovieCard = ({ imageUrl, title, duration, isSaved }) => {
  return (
    <li className={"movie-card"}>
      <div className={"movie-card__saved-flag"}>
        {!isSaved ? (
          <button type="button" className={"movie-card__save-button"}>Сохранить</button>
        ) : (
          <span className={"movie-card__saved-checkmark"}>
            <SaveIcon />
          </span>
        )}
      </div>
      <img src={imageUrl} alt={title} className={"movie-card__image"} />
      <div className={"movie-card__content"}>
        <h2 className={"movie-card__title"}>{title}</h2>
        <p className={"movie-card__duration"}>{duration}</p>
      </div>
    </li>
  );
};

export default MovieCard;

import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({ data, isShortFilterActive }) => {
  const [cardsCount, setCardsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const cardsToAddOnClick = 4;

  const updateCardsCount = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setCardsCount(12);
    } else if (screenWidth >= 768) {
      setCardsCount(8);
    } else {
      setCardsCount(5);
    }
  };

  useEffect(() => {
    updateCardsCount();
    window.addEventListener("resize", updateCardsCount);
    return () => {
      window.removeEventListener("resize", updateCardsCount);
    };
  }, []);

  const handleLoadMoreClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      const nextVisibleCount = cardsCount + cardsToAddOnClick;
      setCardsCount(nextVisibleCount);
      setIsLoading(false);
    }, 1000);
  };

  // Фильтрация фильмов по длительности и короткометражности
  const filteredData = isShortFilterActive
    ? data.filter((movie) => movie.duration <= 40)
    : data;

  return (
    <section className={"movies-card-list"}>
      <ul className={"movies-card-list__grid"}>
        {filteredData.slice(0, cardsCount).map((movie) => (
          <MovieCard key={movie.id ?? movie._id} movie={movie} />
        ))}
      </ul>
      {isLoading ? (
        <Preloader />
      ) : cardsCount < filteredData.length && (
        <div className={"movie-card-container__load-more"}>
          <button
            type="button"
            className={"movie-card-container__btn-more"}
            onClick={handleLoadMoreClick}
          >
            Еще
          </button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;

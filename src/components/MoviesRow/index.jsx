import React, { useState } from "react";
import "./style.css";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

export default ({ title, movies }) => {
  const [scrollX, setScrollX] = useState(-400);
  const handleLeftArrow = () => {
    let scrollValue = scrollX + Math.round(window.innerWidth / 2);
    if (scrollValue > 0) {
      scrollValue = 0;
    }
    setScrollX(scrollValue);
  };
  const handleRightArrow = () => {
    let scrollValue = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = movies.results.length * 150;
    if ((window.innerWidth - listWidth) > scrollValue) {
      scrollValue = (window.innerWidth - listWidth) - 60
    }
    setScrollX(scrollValue);
  };
  return (
    <div className="moviesRow">
      <h2>{title}</h2>
      <div className="moviesRow--left" onClick={handleLeftArrow}>
        <MdNavigateBefore size={50} />
      </div>
      <div className="moviesRow--right" onClick={handleRightArrow}>
        <MdNavigateNext size={50} />
      </div>
      <div className="moviesRow--list-area">
        <div
          className="moviesRow--list"
          style={{
            marginLeft: scrollX,
            width: movies.results.length * 150,
          }}
        >
          {movies.results.length > 0 &&
            movies.results.map((movie, index) => (
              <div key={index} className="moviesRow--movie">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.original_title}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

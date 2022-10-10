import React from "react";
import "./style.css";

export default ({ movie }) => {
  console.log(movie);

  let firstDate = new Date(movie.first_air_date);
  let genres = [];
  for (let genre in movie.genres) {
    genres.push(movie.genres[genre].name);
  }
  let description = movie.overview;
  if (description.length > 200) {
    description = description.substring(0, 200) + '...'
  }
  return (
    <section
      className="featured-movie"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{movie.original_name}</div>
          <div className="featured--info">
            <div className="featured--average">{movie.vote_average.toFixed(1)} pontos</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            <div className="featured--seasons">
              {movie.number_of_seasons} temporada
              {movie.number_of_seasons !== 1 ? "s" : ""}
            </div>
            <div className="featured--description">{description}</div>
            <div className="featured--buttons">
                <a href={`/watch/${movie.id}`} className="featured--watchbutton">▶ Assistir</a>
                <a href={`/list/${movie.id}`} className="featured--mylistbutton">+ Minha lista</a>
            </div>
            <div className="featured--genres">
              <strong>Gêneros</strong> {genres.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

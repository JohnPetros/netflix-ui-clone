import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MoviesRow from "./components/MoviesRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import "./App.css";

export default () => {
  const [movieLists, setMovieLists] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let lists = await Tmdb.getHomeList(null);
      setMovieLists(lists);

      // Pegando o Filme em Destaque
      let originals = lists.filter((list) => list.slug === "originals");
      let randomChosenMovie = Math.floor(
        Math.random() * (originals[0].movies.results.length - 1)
      );
      let chosenMovie = originals[0].movies.results[randomChosenMovie];
      let chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, "tv");
      setFeaturedData(chosenMovieInfo)
      console.log(chosenMovieInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setblackHeader(true);
      } else {
        setblackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie movie={featuredData} />}
      <section className="lists">
        {movieLists.map((movieList, index) => (
          <MoviesRow
            key={index}
            title={movieList.title}
            movies={movieList.movies}
          />
        ))}
      </section>
      <footer>
        Feito com{" "}
        <span role="img" aria-label="coração">
          ❤️
        </span>{" "}
        por João Pedro <br />
        Direitos de imagem reservados para Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>

      {movieLists.length <= 0 && (
        <div className="loading">
          <img
            src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
};

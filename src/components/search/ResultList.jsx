import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import MovieDetail from "../Movies/MovieDetail";
import classes from "./ResultList.module.css";

const API_KEY = "b5a3ad3898299a6668f4d42b2a86f2c5";

const ResultList = (props) => {
  const [data, setData] = useState([]);
  //state dùng thể hiện trạng thái đã click vào movie chưa?
  const [clickedMovie, setClickedMovie] = useState("");
  const [isClickMovie, setIsClickMovie] = useState(false);
  const request = `/search/movie?api_key=${API_KEY}&language=en-US&query=${props.query}`;

  // Lấy dữ liệu
  const { sendRequest: fetchMovie } = useHttp();

  useEffect(() => {
    setIsClickMovie(false);
    const getMovie = (data) => {
      setData(data.results);
    };
    fetchMovie({ url: request }, getMovie);
  }, [fetchMovie, request]);

  // Sự kiện khi click movie
  const onClickMovieHandler = (event) => {
    const index = data.findIndex((e) => e.id === +event.target.id);
    if (+event.target.id === clickedMovie.id && isClickMovie) {
      setIsClickMovie(false);
    } else {
      window.scroll(event.pageX, event.pageY - 150);
      setClickedMovie(data[index]);
      setIsClickMovie(true);
    }
  };

  return (
    <div className={classes.result}>
      <h2>Search Result</h2>
      <div className={classes.movie}>
        {data.length === 0 ? (
          <h3 className={classes.notfound}>
            Movie name: "{props.query}" NOT FOUND!
          </h3>
        ) : (
          data.map((movie) => (
            <img
              onClick={onClickMovieHandler}
              key={movie.id}
              id={movie.id}
              src={`${
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                  : movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : ""
              }`}
              alt=""
            ></img>
          ))
        )}
      </div>
      {isClickMovie ? <MovieDetail movie={clickedMovie} /> : ""}
    </div>
  );
};

export default ResultList;

import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import classes from "./Banner.module.css";

const API_KEY = "b5a3ad3898299a6668f4d42b2a86f2c5";
const Banner = () => {
  const [data, setData] = useState({ backdrop_path: "" });

  const request = `/discover/tv?api_key=${API_KEY}&with_network=123`;

  // Lấy dữ liệu API
  const { sendRequest: fetchMovie } = useHttp();

  useEffect(() => {
    const getRandomMovie = (movie) => {
      setData(
        //random ra poster/backdrop của movie
        movie.results[Math.floor(Math.random() * movie.results.length - 1)]
      );
    };
    fetchMovie({ url: request }, getRandomMovie);
  }, [fetchMovie, request]);

  return (
    <div className={classes.banner}>
      <img
        // Kiểm tra đường dẫn backdrop có không, nếu không đổi sang poster
        src={`${
          data.backdrop_path
            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            : data.poster_path
            ? `https://image.tmdb.org/t/p/original${data.poster_path}`
            : ""
        }`}
        alt=""
      ></img>
      {/* khối hiển thị thông tin phim (tên, mô tả) */}
      <div className={classes.description}>
        <h1 className={classes.moviename}>{data.name}</h1>
        <div className={classes.button_group}>
          <button className={classes.button_play}>Play</button>
          <button className={classes.button_MyList}>My List</button>
        </div>
        <p className={classes.overview}>
          {data.overview === "" ? "Not overview" : data.overview}
        </p>
      </div>
    </div>
  );
};

export default Banner;

import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import classes from "./MovieDetail.module.css";

const MovieDetail = (props) => {
  const API_KEY = "b5a3ad3898299a6668f4d42b2a86f2c5";
  let image = (
    <img
      src={`${
        props.movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`
          : props.movie.poster_path
          ? `https://image.tmdb.org/t/p/original${props.movie.poster_path}`
          : ""
      }`}
      alt=""
    ></img>
  );
  const [data, setData] = useState([]);
  //state dùng để ktra xem movie đó có sẵn trailer ko? nếu ko có thì hiện ảnh thay thế
  const [trailer, setTrailer] = useState(image);
  const request = `/movie/${props.movie.id}/videos?api_key=${API_KEY}`;
      //console.log(request);
  // Lấy dữ liệu
  const { error, sendRequest: fetchMovie } = useHttp();
  useEffect(() => {
    const getMovie = (movie) => {
      setData(movie.results);
    };
    fetchMovie({ url: request }, getMovie);
  }, [request]);

  // Kiểm tra có video trailer không
  // Nếu không có trailer thì hiển thị ảnh
  useEffect(() => {
    let temp;
    if (data.length !== 0) {
      //console.log(data.length);
      for (const e of data) {
        if (
          e.site === "YouTube" &&
          (e.type === "Teaser" || e.type === "Trailer")
        )
          temp = (
            <iframe
              width="48%"
              height="400"
              src={`https://www.youtube.com/embed/${e.key}`}
            ></iframe>
          );
      }
    }
    if (!error && temp) setTrailer(temp);
    else setTrailer(image);
  }, [error, data]);

  
  return (
    
    <div className={classes.moviedetail}>            
      <div>
        <h1>{props.movie.name || props.movie.title}</h1>
        <p>
          <strong>
            Release Date: {props.movie.release_date || props.movie.first_air_date}
          </strong>
        </p>
        <p>
          <strong>Vote: {props.movie.vote_average}/10</strong>
        </p>
        <p>{props.movie.overview}</p>
        
      </div>
      {trailer}
    </div>
  );
};
export default MovieDetail;
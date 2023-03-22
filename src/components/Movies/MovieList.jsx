import React, { useState} from 'react'
import MovieBox from './MovieBox'
import MovieDetail from './MovieDetail';
import classes from './MovieList.module.css'

//biến lưu trữ api
//const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=b5a3ad3898299a6668f4d42b2a86f2c5";
const API_KEY = 'b5a3ad3898299a6668f4d42b2a86f2c5';
const MovieList = () => {
  
  const [clickedMovie, setClickedMovie] = useState("");
  const [isClickMovie, setIsClickMovie] = useState(false);
  //các biến requet để hiển thị các list movie theo nhóm (từ netflix, xem nhiều, xu hướng...)
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  };

 // Nhập tham số từ sự kiện click movie
 const onClickHandler = (movie, isClicked) => {
  setClickedMovie(movie);
  setIsClickMovie(isClicked);
  console.log(isClicked);
};

  return (
    <div className={classes.movielist}>
      <MovieBox path={requests.fetchNetflixOriginals}
        showType="poster"
        onClicked={onClickHandler}>
          

      </MovieBox>
      
      <br />
      <h3>Xu hướng</h3>
      <MovieBox path={requests.fetchTrending} onClicked={onClickHandler} />
      <br />

      <h3>Xếp hạng cao</h3>
      <MovieBox path={requests.fetchTopRated} onClicked={onClickHandler} />
      <h3>Hành động</h3>
      <MovieBox path={requests.fetchActionMovies} onClicked={onClickHandler} />
      <h3>Hài</h3>
      <MovieBox path={requests.fetchComedyMovies} onClicked={onClickHandler} />
      <h3>Kinh dị</h3>
      <MovieBox path={requests.fetchHorrorMovies} onClicked={onClickHandler} />
      <h3>Lãng mạn</h3>
      <MovieBox path={requests.fetchRomanceMovies} onClicked={onClickHandler} />
      <h3>Tài liệu</h3>
      <MovieBox path={requests.fetchDocumentaries} onClicked={onClickHandler} />

      {
        // Kiểm tra trạng thái hiển thị movie detail
        isClickMovie ? <MovieDetail movie={clickedMovie}/> : ''
      }
      
    </div>
  )
}

export default MovieList

import React from 'react';
import Banner from '../../components/Banner/Banner';
import MovieList from '../../components/Movies/MovieList';
import NavBar from '../../components/NavBar/NavBar';

//biến lưu trữ api
//const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=b5a3ad3898299a6668f4d42b2a86f2c5";;
//const API_KEY = 'b5a3ad3898299a6668f4d42b2a86f2c5';
function Browse() {
	
	return (

		<div className="container" >
			<NavBar></NavBar>
			<Banner/>
			<MovieList/>
	  
		</div>
	);
}

export default Browse;


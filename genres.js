// const fetch = require("node-fetch");
// const url = "https://api.themoviedb.org/3/search/movie?api_key=1f26ce4caed92b13586810585d483442&query="
const genres = { 28: "action", 12: "adventure", 16: "animation", 35: "comedy", 80: "crime", 99: "documentary", 18: "drama", 10751: "family", 14: "fantasy", 36: "history", 27: "horror", 10402: "music", 9648: "mystery", 10749: "romance", 878: "science fiction", 10770: "TV movie", 53: "thriller", 10752: "war", 37: "western" };

module.exports = genres;
// const getMovie = async(title) => {
//     const response = await fetch(url + title)
//     const data = await response.json();
//     const list = data.results;

//     const movie = list.find((b) => b.title.toLowerCase() == title.toLowerCase());
//     console.log(movie)
//     const movieGenres = movie.genre_ids;
//     gnr = movieGenres.map(genre => genres[genre]);
//     console.log(gnr)

// } 
// getMovie("Batman")
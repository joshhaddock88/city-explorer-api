const axios = require('axios');
const { response } = require('express');
const movieKey = process.env.MOVIE_API_KEY;
// this cashe holds recently made requests
// keys: movie - city
//value: object {timestamp, movieArr}
let cache = require('./cache.js');


class Movies {
  constructor(movieObject) {
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.average_votes = movieObject.average_votes;
    this.total_votes = movieObject.total_votes;
    this.image_url= `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`;
    this.popularity = movieObject.popularity;
  };
};
  
  
getMovies = async (req, res) => {
  const city = req.query.city;
  const key = `movie - ${city}`;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}&page=1&include_adult=false`

    // get movie data matching city name
    if (cache[key] &&
    Date.now() - cache[key].timestamp < (1000 * 10)) {
      console.log('Cache hit');
      res.send(cache[key]);
    } else {
      try {
        const movieList = await axios.get(url);
        const movieArr = movieList.data.results.map(movie => new Movies(movie));
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cace[key].data = movieArr;
        res.send(movieArr);
        console.log(movieList.data.results);
      } catch {
        res.status(500).send('No movie data found');
      }
    }
  }


module.exports = getMovies;
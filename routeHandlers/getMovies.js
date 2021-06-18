const axios = require('axios');
const movieKey = process.env.MOVIE_API_KEY;


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
  let city = req.query.city;

  try {
    // get movie data matching city name
    const movieList = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}&page=1&include_adult=false`);
    console.log(movieList.data.results);
    
    // return formatted objects
    res.send(movieList.data.results.map(movie => new Movies(movie)));
  } catch {
    response.status(500).send('No movie data found');
  }
};

module.exports = getMovies;
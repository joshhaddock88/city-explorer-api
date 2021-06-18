// configuration: imports and middleware
const axios = require('axios');
require('dotenv').config();
const express = require('express');
const app = express();
const { response } = require('express');
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;
const weatherKey = process.env.WEATHER_API_KEY;
const movieKey = process.env.MOVIE_API_KEY;


// middleware: including something the helps with all of our other requests


class Forecast {
  constructor(forecastObj) {
    this.date = forecastObj.datetime;
    this.description = `Low of ${forecastObj.low_temp}, high of ${forecastObj.high_temp} with ${forecastObj.weather.description.toLowerCase()}`;
  };
};

class Movies {
  constructor(movieObject) {
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.average_votes = movieObject.average_votes;
    this.total_votes = movieObject.total_votes;
    this.image_url= `https://image.tmdb.org/t/p/w500${movieObject.poster_path}`
  }
}


// root route: the one at /
// AND for each of thsoe ruotes specify what each route does.
app.get('/', (req, res) => {
  res.send('server is working!');
})

app.get('/weather', getWeather)

  async function getWeather(req, res){
    let lat = req.query.lat;
    let lon = req.query.lon;
    console.log(lat, lon);

    try{
      const cityWeather = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${lat}&lon=${lon}`);
      console.log(cityWeather);
      res.send(cityWeather.data.data.map(day => new Forecast(day)));
    } catch (err) {
      res.status(500).send('No weather data found');
    }
  }

  app.get('/movies', getMovies)

  async function getMovies(req, res) {
    let city = req.query.city;
    try {
      const movieList = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}&page=1&include_adult=false`);
      console.log(movieList.data.results);
      res.send(movieList.data.results.map(movie => new Movies(movie)));
    } catch (err) {
      response.status(500).send('No movie data found');
    }
  }




// Config PRT 2
app.get('/*', (req, res) => {
  res.status(404).send('This is not a working URL.')
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
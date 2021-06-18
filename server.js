// configuration: imports and middleware
const axios = require('axios');
require('dotenv').config();
const express = require('express');
const app = express();
const { response } = require('express');
const cors = require('cors');
app.use(cors());

// Local imports
const PORT = process.env.PORT || 3001;
const weatherKey = process.env.WEATHER_API_KEY;
const movieKey = process.env.MOVIE_API_KEY;
const getMovies = require(`./routeHandlers/getMovies`);
const getWeather = require(`./routeHandlers/getWeather`);
console.log('Hello world at ', PORT);


// Opening route
app.get('/', (req, res) => res.send('server is working!'));

// Route to get weather forecast
app.get('/weather', getWeather)

// Route for getting movies
app.get('/movies', getMovies)

// Basic error message
app.get('/*', (req, res) => res.status(404).send('This is not a working URL.'));

// Port check in
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
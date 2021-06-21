// configuration: imports and middleware
const axios = require('axios');
require('dotenv').config();
const express = require('express');
const app = express();
const { response } = require('express');
const cors = require('cors');
app.use(cors());

// Local imports
const PORT = process.env.PORT;
// const weatherKey = process.env.WEATHER_API_KEY;
// const movieKey = process.env.MOVIE_API_KEY;
const moviesHandler = require(`./modules/movies.js`);
const weatherHandler = require(`./modules/weather.js`);
console.log(`Hi there, youre listening at port ${PORT}`);


// Opening route
app.get('/', (req, res) => res.send('server is working!'));

// Route to get weather forecast
app.get('/weather', weatherHandler)

// Route for getting movies
app.get('/movies', moviesHandler)

// Basic error message
app.get('/*', (req, res) => res.status(404).send('This is not a working URL.'));

// Port check in
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
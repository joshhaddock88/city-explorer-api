const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const axios = require('axios');

const PORT = process.env.PORT || 3001;



// root route: the one at /
app.get('/', (req, res) => {
  res.send('server is working!');
})

app.get('/weather', getWeather)

  async function getWeather(req, res){
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;

  const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`;

  console.log(lat, lon, searchQuery);

  let cityWeatherData = weatherData.find(city => city.city_name === searchQuery);
  console.log(cityWeatherData);
  if(cityWeatherData === undefined) {
    res.status(500).send('Unsupported city');
  } else {
    let cityDataPrettified = cityWeatherData.data.map(obj => new Forecast(obj.datetime, `Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description.toLowerCase()}`));
    res.send(cityDataPrettified);
  }
  }


class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

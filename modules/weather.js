const axios = require('axios');
const { response } = require('express');
const weatherKey = process.env.WEATHER_API_KEY;
let cache = require('./cache.js');


class Forecast {
  constructor(forecastObj) {
    this.date = forecastObj.datetime;
    this.description = `Low of ${forecastObj.low_temp}, high of ${forecastObj.high_temp} with ${forecastObj.weather.description.toLowerCase()}`;
  };
};

// this cashe holds recently made requests
// keys: lat and lon
//value: city weather

getWeather = async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const key = `weather - ${lat}${lon}`
  console.log(key);
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${lat}&lon=${lon}`

  console.log(lat, lon);
  if(cache[key] && 
    Date.now() - cache[key].timestamp < (1000 * 10)) {
    //cache hit!
    console.log('Cache hit');
    res.send(cache[key])
  } else {
    console.log('Cache miss')
    try{
      // Get weather data based on lat/lon
      const cityWeather = await axios.get(url);
      // format data to return to user
      const weatherArr = cityWeather.data.data.map(day => new Forecast(day))
      //save weather data into the cache for next time.
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = weatherArr;
      res.send(weatherArr);
    } catch {
      res.status(500).send('No weather data found');
    };
  }
};

module.exports = getWeather;

// function getWeather(latitude, longitude) {
//   const key = 'weather-' + latitude + longitude;
//   const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

//   if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
//     console.log('Cache hit');
//   } else {
//     console.log('Cache miss');
//     cache[key] = {};
//     cache[key].timestamp = Date.now();
//     cache[key].data = axios.get(url)
//     .then(response => parseWeather(response.body));
//   }
  
//   return cache[key].data;
// }

// function parseWeather(weatherData) {
//   try {
//     const weatherSummaries = weatherData.data.map(day => {
//       return new Weather(day);
//     });
//     return Promise.resolve(weatherSummaries);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// }
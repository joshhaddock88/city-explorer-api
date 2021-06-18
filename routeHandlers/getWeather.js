const axios = require('axios');
const weatherKey = process.env.WEATHER_API_KEY;


class Forecast {
  constructor(forecastObj) {
    this.date = forecastObj.datetime;
    this.description = `Low of ${forecastObj.low_temp}, high of ${forecastObj.high_temp} with ${forecastObj.weather.description.toLowerCase()}`;
  };
};


getWeather = async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  console.log(lat, lon);

  try{
    // Get weather data based on lat/lon
    const cityWeather = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${lat}&lon=${lon}`);
    console.log(cityWeather);
    // format data to return to user
    res.send(cityWeather.data.data.map(day => new Forecast(day)));
  } catch {
    res.status(500).send('No weather data found');
  };
};

module.exports = getWeather;
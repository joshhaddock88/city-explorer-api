// ---------------------- Global Vars -----------------
console.log('Hello from node!')
const weather = require('./data/weather.json');
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT;

// ---------------- Constructor ---------------------
function Forecast(date, description) {
  this.date = date;
  this.description = description;
}


//--------------------------------------------------


const error = "We were unable fulfill your request. Please try another city."

console.log('port is ' + PORT)

app.get('/', (request, response) => {
  response.send('Hello from the server!');
})


app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
  (weather.find( ({ city_name }) => city_name === searchQuery)) ?
  response.send(`${searchQuery}: ${lat}, ${lon}`) :
  response.send(error);
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
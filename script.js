
const apiKey = "d26b07ee1d2bd1b944c6b777c8ce0be9" 

const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q="; // This is beginning of the API call we use to convert city names to coordinates!
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?"; //This is beginning of the API call we use to convert coordinates to weather!
const submitButton = document.getElementById("submit");

const cityName = document.getElementById("cityName"); //Clue #1
const mainWeather = document.getElementById("mainWeather");
const weatherDescription = document.getElementById("weatherDescription");

// This adds an event listener to check when the submit button is clicked,
// then if the cityName's value is not blank, we call setWeatherDescription with cityName.value as the argument.
submitButton.addEventListener("click", function () {
  if (cityName.value != "") {
    setWeatherDescription(cityName.value);
  }
});


// This function takes in a city name (that the user inputs), and gets the latitude and longitude
// of that city. This is important because our second API call, the one that actually gets the weather,
// requires a latitude and longitude coordinate pair.
async function getLatLon(city) {

  // the API url
let url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+apiKey   

  let response = await fetch(url) 
  let data = await response.json() //This line parses the response into JSON format so we can use it!

  // Let's return a JavaScript object here! 
  return {
    "lat": data[0]["lat"], //this is the default
    "lon": data[0]["lon"]
  }
}

//This function makes a GET request to retrieve weather data at a specific latitude and longitude.

async function getWeather(lat, lon) {
  let url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey /* Format the appropriate API url to retrieve weather data */
  let response = await fetch(url)/* Fetch data from the url you just wrote (what keyword do we need?) */ 
  let data = await response.json()/* Parse the response as JSON here */

  // Return the main weather and weather description from the data variable! 
  return {
    "main": data.weather[0].main,
    "description": data.weather[0].description
  }
}

// This function gets the weather using the functions you wrote above and displays it in the HTML.
async function setWeatherDescription(city) {
  // This line calls getLatLon on the city name provided to find the latitude and longitude of that city.
  let coordinateData = await getLatLon(city)

  // Extract the lat and lon from coordinateData.
  const lat = coordinateData.lat
  const lon = coordinateData.lon


  let weatherData = await getWeather(lat, lon)
  
  // Same thing here, but we want to set mainWeather and weatherDescription's innerHTML to the relevant values in weatherData.
  mainWeather.innerHTML = weatherData.main
  weatherDescription.innerHTML = weatherData.description
  /* Set weatherDescription's innerHTML here */
}

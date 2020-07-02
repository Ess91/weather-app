let current = new Date();
let h4 = document.querySelector("h4");

//Minutes in two digits
//Hours in 24hrs clock

let hours = ("0" + current.getHours()).slice(-2);
let minutes = ("0" + current.getMinutes()).slice(-2);

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[current.getDay()];

let date = current.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "Jul",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[current.getMonth()];

h4.innerHTML = `${day}, ${date} ${month} ${hours}:${minutes}`;

//Fahrenheit
function changeFahrenheit(event) {
  event.preventDefault();
  let tempCel = 22;
  let tempFah = Math.round(tempCel * 1.8 + 32);
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = tempFah;
}

let fahrenheit = document.querySelector("#fah-link");
fahrenheit.addEventListener("click", changeFahrenheit);

//Celsuis
function changeCelsius(event) {
  event.preventDefault();
  let tempCel = 22;
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = tempCel;
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeCelsius);

//Weather API

function showTemperature(response) {
  console.log(response);
  let degrees = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${degrees}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let desc = document.querySelector(".weather");
  desc.innerHTML = response.data.weather[0].description;

  let feels = document.querySelector("#feels");
  feels.innerHTML = `${response.data.main.feels_like}°C`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

//GeoLocation
function retrievePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "04aa17b83da5f57d5730a73b6f2926e0";

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let present = document.querySelector("#current-btn");
present.addEventListener("click", getCurrentPosition);

//Search City

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-bar");
  let apiKey = "04aa17b83da5f57d5730a73b6f2926e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${
    input.value
  }&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

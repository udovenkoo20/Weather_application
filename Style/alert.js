function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let forecast = document.querySelector(".tdegree");
  let temperature = Math.round(response.data.main.temp);
  let city = document.querySelector(".city");
  let location = response.data.name;
  let wet = document.querySelector("#humidity");
  let windy = document.querySelector("#wind");
  let weatherDescription = document.querySelector("#description");
  let dateElement = document.querySelector(".today");
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let iconElement = document.querySelector("#ticon");
  let description = response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;
  forecast.innerHTML = `${temperature}`;
  wet.innerHTML = humidity;
  windy.innerHTML = wind;
  city.innerHTML = `${location}|`;
  weatherDescription.innerHTML = description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = "8658c7c07f108f7322318434c640096a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(url).then(displayWeather);
}

function newcity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city");
  searchCity(inputCity.value);
  event.target.reset();
}

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", newcity);

function currentLocation(event) {
  event.preventDefault();
  function retrievePosition(position) {
    let apiKey = "8658c7c07f108f7322318434c640096a";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
  }
  let curCity = document.querySelector(".city");
  curCity.innerHTML =
    navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showfahrenheitLink(event) {
  event.preventDefault();
  let degree = document.querySelector(".tdegree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  degree.innerHTML = Math.round(fahrenheit);
}

function showcelsiusLink(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let degree = document.querySelector(".tdegree");
  degree.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentLoc = document.querySelector("#currentL");
currentLoc.addEventListener("click", currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheitLink);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusLink);

searchCity("Kyiv");

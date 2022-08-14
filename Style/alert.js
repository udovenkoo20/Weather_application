function currentdate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let formattedate = `${currentDay}, ${currentHour}:${currentMinutes}`;
  return formattedate;
}
let dateNow = currentdate(new Date());
let today = document.querySelector(".today");
today.innerHTML = dateNow;

function displayWeather(response) {
  let forecast = document.querySelector(".tdegree");
  let temperature = Math.round(response.data.main.temp);
  forecast.innerHTML = `${temperature}`;
  let city = document.querySelector(".city");
  let location = response.data.name;
  city.innerHTML = `${location}|`;
  let wet = document.querySelector("#humidity");
  let windy = document.querySelector("#wind");
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  wet.innerHTML = humidity;
  windy.innerHTML = wind;
}

function newcity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city");
  let apiKey = "8658c7c07f108f7322318434c640096a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&&units=metric`;
  axios.get(url).then(displayWeather);
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
let currentLoc = document.querySelector("#currentL");
currentLoc.addEventListener("click", currentLocation);

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let time = document.querySelector("#time");
time.innerHTML = formatDate(now);

// end of time

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function locateLocation(position) {
  let apiKey = "61fd56c5c0e9fc191bfe9fef9504c6d0";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperatureAtLocation(event) {
  navigator.geolocation.getCurrentPosition(locateLocation);
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "61fd56c5c0e9fc191bfe9fef9504c6d0";
  let city = document.querySelector("#search-input-city").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#button-current-location");
currentLocationButton.addEventListener("click", showTemperatureAtLocation);

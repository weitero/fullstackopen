import axios from "axios";
const baseUrl =
  "https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m&wind_speed_unit=ms";
const baseUrlOpenWeather = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getCurrentWeather = (latitude, longitude) => {
  return axios
    .get(`${baseUrl}&latitude=${latitude}&longitude=${longitude}`)
    .then((res) => res.data);
};

const getCurrentWeatherFromOpenWeather = (latitude, longitude) => {
  return axios
    .get(`${baseUrlOpenWeather}&lat=${latitude}&lon=${longitude}&appid=${api_key}`)
    .then((res) => res.data);
};

export default { getCurrentWeather, getCurrentWeatherFromOpenWeather };

import axios from "axios";
const baseUrl =
  "https://api.open-meteo.com/v1/forecast?current=temperature_2m,wind_speed_10m&wind_speed_unit=ms";

const getCurrentWeather = (latitude, longitude) => {
  return axios
    .get(`${baseUrl}&latitude=${latitude}&longitude=${longitude}`)
    .then((res) => res.data);
};

export default { getCurrentWeather };

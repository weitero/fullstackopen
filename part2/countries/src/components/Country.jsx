import Weather from "./Weather";
import weatherService from "../services/weather";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log("fetching weather...");
    weatherService
      .getCurrentWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then((res) => {
        // console.log(res);
        setWeather(res);
      });
  }, [country]);

  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital[0]}</h2>
      <Weather weather={weather} />
    </div>
  );
};

export default Country;

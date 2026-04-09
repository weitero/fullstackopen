const Weather = ({ weather }) => {
  if (!weather) {
    return null;
  }
  return (
    // <div>
    //   <p>
    //     Temperature {weather.current.temperature_2m} {weather.current_units.temperature_2m}
    //   </p>
    //   <p>
    //     Wind {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}
    //   </p>
    // </div>
    <div>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;

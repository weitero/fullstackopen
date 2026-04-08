const Country = ({ countryObj }) => {
  return (
    <div key={countryObj.name.common}>
      <h1>{countryObj.name.common}</h1>
      <p>Capital {countryObj.capital[0]}</p>
      <p>Area {countryObj.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryObj.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={countryObj.flags.png} />
    </div>
  );
};

export default Country;

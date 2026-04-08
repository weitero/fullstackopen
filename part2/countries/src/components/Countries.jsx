const Countries = ({ countries, searchWord }) => {
  const filteredCountries = countries.filter((c) => {
    if (!searchWord) {
      return true;
    }
    return c.name.common.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase());
  });

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1) {
    return filteredCountries.map((c) => <p key={c.name.common}>{c.name.common}</p>);
  } else {
    return filteredCountries.map((c) => {
      return (
        <div key={c.name.common}>
          <h1>{c.name.common}</h1>
          <p>Capital {c.capital[0]}</p>
          <p>Area {c.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(c.languages).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <img src={c.flags.png} />
        </div>
      );
    });
  }
};

export default Countries;

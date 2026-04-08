const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return countries.map((c) => <p key={c.name.common}>{c.name.common}</p>);
  } else {
    return countries.map((c) => {
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

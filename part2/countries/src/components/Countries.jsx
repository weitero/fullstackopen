const Countries = ({ countries, handleShowSingle }) => {
  return countries.map((country) => (
    <p key={country.name.common}>
      {country.name.common}{" "}
      <button onClick={() => handleShowSingle(country.name.common)}>Show</button>
    </p>
  ));
};

export default Countries;

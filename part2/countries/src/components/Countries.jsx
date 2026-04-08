const Countries = ({ countries, handleShowSingle }) => {
  return countries.map((c) => (
    <p key={c.name.common}>
      {c.name.common} <button onClick={() => handleShowSingle(c.name.common)}>Show</button>
    </p>
  ));
};

export default Countries;

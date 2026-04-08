import Notification from "./Notification";
import Countries from "./Countries";
import Country from "./Country";

const Display = ({ countries, handleShowSingle }) => {
  const n = countries.length;
  if (n > 10) {
    return <Notification />;
  } else if (n > 1) {
    return <Countries countries={countries} handleShowSingle={handleShowSingle} />;
  } else if (n === 1) {
    return <Country country={countries[0]} />;
  }
};

export default Display;

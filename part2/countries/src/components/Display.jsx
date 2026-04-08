import Notification from "./Notification";
import Countries from "./Countries";
import Country from "./Country";

const Display = ({ countries, handleShowSingle }) => {
  if (countries.length > 10) {
    return <Notification />;
  } else if (countries.length > 1) {
    return <Countries countries={countries} handleShowSingle={handleShowSingle} />;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
};

export default Display;

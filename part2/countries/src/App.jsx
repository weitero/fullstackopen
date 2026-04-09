import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import Display from "./components/Display";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState(null);

  useEffect(() => {
    // Adapted from: https://erikmartinjordan.com/start-search-user-not-typing
    // Another ref: https://stackoverflow.com/questions/77123890/debounce-in-reactjs
    // This is to avoid API request after each keystroke
    const timer = setTimeout(() => {
      console.log(`search word: ${searchWord}`);
      if (searchWord) {
        console.log("fetching countries...");
        countriesService.getAll().then((countries) => {
          setCountries(
            countries.filter((c) =>
              c.name.common.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()),
            ),
          );
        });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchWord]);

  const handleOnChange = (e) => {
    setValue(e.target.value);
    setSearchWord(e.target.value);
    if (e.target.value === "") {
      setCountries([]);
    }
  };

  const handleShowSingle = (name) => {
    setCountries([countries.find((c) => c.name.common === name)]);
  };

  return (
    <div>
      find countries <input value={value} onChange={handleOnChange} />
      <Display countries={countries} handleShowSingle={handleShowSingle} />
    </div>
  );
};

export default App;

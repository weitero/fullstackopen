import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import countriesService from "./services/countries";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [searchWord, setSearchWord] = useState(null);

  useEffect(() => {
    console.log("effect run, searchWord is now: ", searchWord);
    if (searchWord) {
      console.log("fetching countries...");
      countriesService.getAll().then((c) => {
        console.log(c);
        setCountries(c);
      });
    }
  }, [searchWord]);

  const handleOnChange = (e) => {
    setValue(e.target.value);
    setSearchWord(e.target.value);
  };

  return (
    <div>
      find countries <input value={value} onChange={handleOnChange} />
      <Countries countries={countries} searchWord={searchWord} />
    </div>
  );
};

export default App;

import { useState } from "react";

const App = () => {
  const [searchWord, setSearchWord] = useState("");
  const handleOnChange = (e) => {
    setSearchWord(e.target.value);
  };
  return (
    <div>
      find countries <input value={searchWord} onChange={handleOnChange} />
    </div>
  );
};
export default App;

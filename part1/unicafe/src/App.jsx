import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Display = ({ feedback, count }) => {
  return (
    <p>
      {feedback} {count}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={() => setGood(good + 1)} />
      <Button text={"neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button text={"bad"} onClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Display feedback={"good"} count={good} />
      <Display feedback={"neutral"} count={neutral} />
      <Display feedback={"bad"} count={bad} />
    </div>
  );
};

export default App;

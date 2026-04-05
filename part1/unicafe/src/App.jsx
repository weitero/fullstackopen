import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={total} />
      <StatisticsLine text='average' value={(good - bad) / total} />
      <StatisticsLine text='positive' value={100 * (good / total) + " %"} />
    </div>
  );
};

const StatisticsLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);

  const handleNeutral = () => setNeutral(neutral + 1);

  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={handleGood} />
      <Button text={"neutral"} onClick={handleNeutral} />
      <Button text={"bad"} onClick={handleBad} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

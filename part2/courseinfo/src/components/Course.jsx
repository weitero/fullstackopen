const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => {
  const total = props.parts
    .map((part) => part.exercises)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total total={total} />
    </div>
  );
};

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => (
  <strong>
    <p>total of {props.total} exercises</p>
  </strong>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;

import { useState } from "react";

const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with <input value={props.value} onChange={props.onChange} />
      </div>
    </form>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.nameValue} onChange={props.nameOnChange} />
      </div>
      <div>
        number: <input value={props.numberValue} onChange={props.numberOnChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, newFilter }) => {
  return persons
    .filter((p) => {
      if (newFilter === "") {
        return true;
      }
      return p.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase());
    })
    .map((p) => {
      return <Person p={p} />;
    });
};

const Person = ({ p }) => {
  return (
    <p key={p.name}>
      {p.name} {p.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObj = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;

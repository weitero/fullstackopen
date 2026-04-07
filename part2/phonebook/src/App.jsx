import personService from "./services/persons";
import Notification from "./components/Notification";
import { useEffect, useState } from "react";

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

const Persons = ({ persons, newFilter, delPerson }) => {
  return persons
    .filter((p) => {
      if (newFilter === "") {
        return true;
      }
      return p.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase());
    })
    .map((p) => {
      return (
        <Person
          key={p.id}
          p={p}
          delPerson={() => {
            if (confirm(`Delete ${p.name}?`)) {
              delPerson(p.id);
            }
          }}
        />
      );
    });
};

const Person = ({ p, delPerson }) => {
  return (
    <p>
      {p.name} {p.number} <button onClick={delPerson}>delete</button>
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = persons.find((p) => p.name === newName);
    if (personObj === undefined) {
      const newObj = {
        name: newName,
        number: newNumber,
      };
      personService
        .add(newObj)
        .then((pObj) => {
          setPersons(persons.concat(pObj));
        })
        .then(() => {
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else {
      if (
        confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        const updatePersonObj = { ...personObj, number: newNumber };
        personService
          .update(personObj.id, updatePersonObj)
          .then((r) => {
            setPersons(persons.map((p) => (p.id === r.id ? r : p)));
          })
          .then(() => {
            setMessage(`Updated ${newName}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const delPerson = (id) => {
    personService.del(id).then((pObj) => {
      setPersons(persons.filter((p) => p.id !== pObj.id));
    });
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

      <Notification message={message} messageType={"success"} />
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

      <Persons persons={persons} newFilter={newFilter} delPerson={delPerson} />
    </div>
  );
};

export default App;

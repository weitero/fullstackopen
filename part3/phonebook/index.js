const express = require("express");
const morgan = require("morgan");
const Person = require("./models/note");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("data", (request, response) => {
  return JSON.stringify(request.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people</br>${String(new Date())}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((res) => {
      response.json(res).status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  const body = request.body;
  if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }

  if (person) {
    const personIndex = persons.findIndex((p) => p.id === id);
    persons[personIndex].number = body.number;
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  // Use a big enough range for your random values so that the likelihood of
  // creating duplicate ids is small.
  return String(Math.floor(Math.random() * 1_000_000_000));
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name and/or number missing" });
  }

  const names = persons.map((p) => p.name);
  if (names.includes(body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

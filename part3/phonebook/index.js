const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("data", (request, response) => {
  return JSON.stringify(request.body);
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`Phonebook has info for ${persons.length} people</br>${String(new Date())}`);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((p) => {
    response.json(p);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((res) => {
      response.json(res).status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  Person.findById(request.params.id)
    .then((p) => {
      if (!p) {
        return response.status(404).end();
      }
      p.name = name;
      p.number = number;

      return p
        .save()
        .then((updatedPerson) => {
          response.json(updatedPerson);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

const generateId = () => {
  // Use a big enough range for your random values so that the likelihood of
  // creating duplicate ids is small.
  return String(Math.floor(Math.random() * 1_000_000_000));
};

app.post("/api/persons", (request, response, next) => {
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
    id: generateId(),
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((err) => next(err));
});

// error-handling middleware has to be the last loaded middleware, also all the
// routes should be registered before the error-handler!
const errorHandler = (err, request, response, next) => {
  console.error(err.message);
  if (err.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return response.status(400).json({ error: err.message });
  }
  next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

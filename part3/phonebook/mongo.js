require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 4) {
  const name = process.argv[2];
  const number = process.argv[3];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((_) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((res) => {
    console.log("phonebook:");
    res.forEach((p) => {
      console.log(p.name, p.number);
    });
    mongoose.connection.close();
  });
}

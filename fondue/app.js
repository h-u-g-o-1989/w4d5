const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/verbs-verbs-all-around", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("CONNECTED TO DB");
  });

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  releaseDate: Date,
  isAvailable: Boolean,
  genre: String,
});

const Book = mongoose.model("Book", bookSchema);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "hbs");

const user = {
  name: "André",
};

// POST -> Create something new / Sends a request, WITH some data     -          C(reate)
// GET -> Gets all Our Stuff / Makes a request for SOMETHING                     R(ead)
// PUT  -> Update something existing / Sends a request, WITH some data ->        U(pdate)
// DELETE -> Delete something that already exists / Sends a request to delete -> D(elete)

app.get("/", (req, res) => {
  console.log("GET REQUEST, VISITNG HOME PAGE");
  res.render("index", { user });
});

app.get("/new", (req, res) => {
  console.log("GET REQUEST, VISITNG NEW BOOK PAGE");

  res.render("new");
});

app.post("/new", (req, res) => {
  console.log("POST REQUEST, TO NEW BOOK");
  console.log(req.body);
});

// app.delete("/book", (req, res) => {});

app.listen(3000, () => {
  console.log("SERVER RUNNING ON PORT 3000");
});

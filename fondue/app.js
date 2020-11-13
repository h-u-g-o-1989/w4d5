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
  Book.find().then((allTheBooks) => {
    //  console.log("allTheBooks:", allTheBooks);

    res.render("index", { user, books: allTheBooks });
  });
});

app.get("/new", (req, res) => {
  console.log("GET REQUEST, VISITNG NEW BOOK PAGE");

  res.render("new");
});

app.post("/new-book", (req, res) => {
  console.log("POST REQUEST, TO NEW BOOK");
  const isAvailable = true;
  const { author, genre, pages, releaseDate } = req.body;
  // you would check the property here
  //   yoiu can check manually if it obeys specific orders

  console.log(req.body);
  Book.create({
    author,
    genre,
    releaseDate,
    pages,
    isAvailable,
  })
    .then((bookCreated) => {
      // console.log("bookCreated:", bookCreated);
      res.redirect("/");
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

app.get("/new-book", (req, res) => {
  console.log(req.query);
  res.render("index");
});

// app.delete("/book", (req, res) => {});

app.listen(3000, () => {
  console.log("SERVER RUNNING ON PORT 3000");
});

const express = require("express");
const req = require("express/lib/request");
const mongoose = require("mongoose");
const Book = require("./models/book");
const bookSeedData = require("./models/bookSeed");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Middleware
//Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

app.get("/books/seed", (req, res) => {
  Book.deleteMany({}, (err, deltedBooks) => {
    Book.create(bookSeed, (err, data) => {
      res.redirect("/books");
    });
  });
});

/// Index
app.get("/books", (req, res) => {
  Book.find({}, (err, allBooks) => {
    res.render("index.ejs", {
      books: allBooks,
    });
  });
});

//render a page with our form to collect info
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/books/:id", (req, res) => {
  Book.findById(req.params.id, (err, foundBook) => {
    res.render("show.ejs", { book: foundBook });
  });
});

app.get("/books/:id", (req, res) => {
  res.send(req.params.id);
});

//Create
app.post("/books", (req, res) => {
  console.log(req.body.completed);
  req.body.completed = !!req.body.completed;
  Book.create(req.body, (err, createdBook) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect("/books");
    }
  });
});

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Database Connection Error/Success
//Callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

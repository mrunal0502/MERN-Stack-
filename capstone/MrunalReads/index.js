import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// import axiom from "axiom";

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookstore",
  password: "root",
  port: 5432,
});

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    date: "2025-06-08",
    rating: 10,
    summary:
      "Atomic Habits by James Clear teaches how small daily habits, when done consistently, can lead to big changes over time. The book is practical, easy to understand, and full of real-life examples. It explains how to build good habits, break bad ones, and stay consistent with simple strategies.",
    cover: "",
  },
  // Add more books here as needed
];

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

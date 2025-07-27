import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let totalCorrect = 0;
let currentQuestion = {};
let quiz = [];

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "root",
  port: 5432,
});

db.connect();

db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.err("Error in executing query" + err);
  } else {
    quiz = res.rows;
  }
  db.end();
});

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", async (req, res) => {
  let answer = req.body.answer?.trim();
  let isCorrect = false;

  console.log(currentQuestion);
  console.log(currentQuestion.country);
  console.log("Your Answer: ", answer);

  if (
    currentQuestion.country &&
    answer &&
    normalize(currentQuestion.country) === normalize(answer)
  ) {
    totalCorrect++;
    console.log("Total Correct: ", totalCorrect);
    isCorrect = true;
    console.log("Was Correct: ", isCorrect);
  }

  await nextQuestion(); // Wait for new question to be chosen
  console.log(currentQuestion);
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

function normalize(str) {
  return str.trim().toLowerCase().replace(/\s+/g, " ");
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

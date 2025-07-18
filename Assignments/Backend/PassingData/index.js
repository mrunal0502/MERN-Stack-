import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var count = 0;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

function countletters(req, res, next) {
  count = req.body.fName.length + req.body.lName.length;
  next();
}

app.use(countletters);

app.post("/submit", (req, res) => {
  res.render("index.ejs", { letters: count });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

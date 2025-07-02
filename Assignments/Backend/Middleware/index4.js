import express from "express";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import bodyParser from "body-parser";
const app = express();
const port = 3000;

var bandName = "";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

function bandNameGen(req, res, next) {
  console.log(req.body);
  bandName = req.body.street + req.body.pet;
  next();
}

app.use(bandNameGen);

app.post("/submit", (req, res) => {
  res.send(bandName);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

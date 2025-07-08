import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// This will store the submitted form data temporarily
let data = null;

app.get("/", (req, res) => {
  res.render("index", { formData: data });
});

app.get("/create", (req, res) => {
  res.render("form", { formData: null });
});

app.post("/submit", (req, res) => {
  data = {
    title: req.body.title,
    content: req.body.content,
    img: req.body.img, // example: meta or tesla (without .png)
  };
  res.redirect("/"); // Show updated post on home
});

app.post("/edit", (req, res) => {
  res.render("form", { formData: data });
});

app.post("/delete", (req, res) => {
  data = null;
  res.redirect("/"); // Show updated post on home
});

app.listen(port, () => {
  console.log("Server is running at " + port);
});

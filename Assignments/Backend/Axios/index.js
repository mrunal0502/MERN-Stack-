import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// GET: Don't send data initially
app.get("/", (req, res) => {
  res.render("index.ejs", { data: null, error: null });
});

app.post("/", async (req, res) => {
  const reqtype = req.body.type;
  const reqparticipants = req.body.participants;

  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${reqtype}&participants=${reqparticipants}`
    );
    const result = response.data;

    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
      error: null,
    });
  } catch (error) {
    res.render("index.ejs", {
      data: null,
      error: "No activities that match your criteria",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

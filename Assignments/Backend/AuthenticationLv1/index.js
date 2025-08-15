import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "root",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const check = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (check.rows.length > 0) {
      res.send("User already exists");
      return;
    } else {
      const result = await db.query(
        "INSERT INTO users (email,password) VALUES ($1,$2)",
        [username, password]
      );
      console.log("User registered successfully");
      res.render("secrets.ejs");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  try {
    const check = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (check.rows.length <= 0) {
      res.send("User does not exits");
      return;
    } else {
      const user = check.rows[0];
      if (user.password === password) {
        console.log("User logged in successfully");
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect password");
        return;
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

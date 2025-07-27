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
  database: "world",
  password: "root",
  port: 5432,
});

db.connect();

let countries = [];

db.query("SELECT country_code FROM visited_countries", (err, res) => {
  if (err) {
    console.log("Error while executing query", err);
  } else {
    countries = res.rows.map((row) => row.country_code); //
  }
});

app.get("/", async (req, res) => {
  //Write your code here.
  try {
    console.log(countries);
    res.render("index", { countries: countries, total: countries.length });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const country = req.body.country;
  console.log(country);
  await db.query(
    "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
    [country.toLowerCase()],
    async (err, dbres) => {
      if (err) {
        console.log("Error while executing query of finding country code", err);
      } else if (dbres.rows.length === 0) {
        console.log("Country not found in database:", country);
        res.render("index", {
          countries: countries,
          total: countries.length,
          error: "Country not found in database.",
        });
        return;
      } else {
        const code = dbres.rows[0].country_code;
        console.log("Country code found:", code);
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [code],
          (err, dbres2) => {
            if (err) {
              if (err.code === "23505") {
                console.log("Country code already exists in visited_countries");
                res.render("index", {
                  countries: countries,
                  total: countries.length,
                  error: "Country code already exists in visited countries.",
                });
                return;
              } else {
                console.log(
                  "Error while executing query of inserting country code",
                  err
                );
                res.send("Database error.");
                return;
              }
            } else {
              console.log("Country code inserted successfully");
              countries.push(code); // Update the in-memory array
              res.redirect("/");
            }
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { console } from "inspector";

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const randomAPI = await axios.get(`${API_URL}/random.php`);
    res.render("index", { data: randomAPI.data });
  } catch (error) {
    console.error(error);
  }
});

app.get("/explore", async (req, res) => {
  try {
    const content = await axios.get(`${API_URL}/filter.php?a=Alcoholic`);
    console.log(content.data);
    res.render("explore", { data: content.data });
  } catch (error) {
    console.error(error);
  }
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    console.log(query);
    const searchAPI = await axios(`${API_URL}/search.php?s=${query}`);
    res.render("searchoutput", { data: searchAPI.data });
  } catch (error) {
    console.error(error);
  }
});

app.get("/recipe", async (req, res) => {
  try {
    const content = await axios.get(`${API_URL}/random.php`);
    console.log(content.data);
    res.render("recipe", { data: content.data });
  } catch (error) {
    console.error(error);
  }
});

app.get("/recipe/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const content = await axios.get(`${API_URL}/lookup.php?i=${id}`);
    console.log(content.data);
    res.render("recipe", { data: content.data });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

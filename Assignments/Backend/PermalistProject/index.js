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
  database: "todo",
  password: "root",
});

db.connect();

let items = [];
let monthitems = [];
let yearitems = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows;
    const monthResult = await db.query("SELECT * FROM month ORDER BY id ASC");
    monthitems = monthResult.rows;
    console.log("Month items:", monthitems);
    const yearResult = await db.query("SELECT * FROM year ORDER BY id ASC");
    console.log("Year items:", yearResult.rows);
    yearitems = yearResult.rows;
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
      listTitlemonth: "This month",
      listMonthItems: monthitems,
      listTitleyear: "This year",
      listYearItems: yearitems,
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  try {
    const item = req.body.newItem;
    if (item) {
      await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    }
    const mitem = req.body.newItemMonth;
    if (mitem) {
      await db.query("INSERT INTO month (mitem) VALUES ($1)", [mitem]);
    }
    const yitem = req.body.newItemYear;
    if (yitem) {
      await db.query("INSERT INTO year (yitem) VALUES ($1)", [yitem]);
    }
    res.redirect("/");
  } catch (err) {
    console.error("Error inserting item:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/edit", async (req, res) => {
  try {
    const id = req.body.updatedItemId;
    const item = req.body.updatedItemTitle;
    if (id) {
      await db.query("UPDATE items SET title=$1 WHERE id=$2", [item, id]);
    }
    const mid = req.body.updatedItemIdMonth;
    const mitem = req.body.updatedItemTitlem;
    if (mid) {
      await db.query("UPDATE month SET mitem=$1 WHERE id=$2", [mitem, mid]);
    }
    const yid = req.body.updatedItemIdYear;
    const yitem = req.body.updatedItemTitley;
    if (yid) {
      await db.query("UPDATE year SET yitem=$1 WHERE id=$2", [yitem, yid]);
    }
    res.redirect("/");
  } catch (err) {
    console.log("Error in editing query", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", (req, res) => {
  try {
    const id = req.body.deleteItemId;
    if (id != null) {
      console.log("Deleting item with ID:", id);
      db.query("DELETE FROM items WHERE id=$1", [id]);
    }

    const mid = req.body.deleteItemIdm;
    if (mid != null) {
      console.log("Deleting month item with ID", mid);
      db.query("DELETE FROM month WHERE id=$1", [mid]);
    }

    const yid = req.body.deleteItemIdy;
    if (yid != null) {
      console.log("Deleting year item with ID:", yid);
      db.query("DELETE FROM year WHERE id=$1", [yid]);
    }
    res.redirect("/");
  } catch (err) {
    console.log("Error in deleting query", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

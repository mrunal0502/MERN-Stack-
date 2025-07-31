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

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows;
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query(
    "INSERT INTO items (title) VALUES ($1)",
    [item],
    (err, result) => {
      if (err) {
        console.error("Error inserting item:", err);
      } else {
        console.log("Item inserted successfully");
      }
    }
  );
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const id = req.body.updatedItemId;
  console.log("Editing item with ID:", id);
  const updateitem = req.body.updatedItemTitle;
  console.log("Updated item:", updateitem);
  try {
    db.query("UPDATE items SET title = $1 WHERE id=$2", [updateitem, id]);
    res.redirect("/");
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", (req, res) => {
  const id = req.body.deleteItemId;
  console.log("Deleting item with ID:", id);
  db.query("DELETE FROM items WHERE id=$1", [id]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

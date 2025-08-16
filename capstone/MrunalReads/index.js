import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// import axiom from "axiom";

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookstore",
  password: "root",
  port: 5432,
});
db.connect();

app.get("/", async (req, res) => {
  try {
    // 1. Fetch all books from your database
    const output = await db.query(
      "SELECT * FROM books ORDER BY date_read DESC"
    );
    const books = output.rows;
    console.log(books);
    // 2. Fetch cover images for each book
    const updatedBooks = await Promise.all(
      books.map(async (book) => {
        try {
          // If you have ISBN, you can directly use it:
          // const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

          // If you only have title, search Open Library:
          const searchRes = await fetch(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(
              book.title
            )}`
          );
          const data = await searchRes.json();
          const coverId = data?.docs?.[0]?.cover_i;
          const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : "/images/default-cover.jpg";

          return {
            ...book,
            coverUrl,
          };
        } catch (err) {
          console.error(`Error fetching cover for ${book.title}:`, err);
          return {
            ...book,
            coverUrl: "/images/default-cover.jpg",
          };
        }
      })
    );

    // 3. Render to EJS
    res.render("index", { books: updatedBooks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading books");
  }
});

app.get("/add", async (req, res) => {
  res.render("form", { book: {}, editing: false });
});

app.post("/add", async (req, res) => {
  const title = req.body.title;
  const date_read = req.body.date_read;
  const rating = req.body.rating;
  const summary = req.body.summary;

  try {
    const book = await db.query(
      "INSERT INTO books(title,date_read,rating,summary) VALUES($1,$2,$3,$4) RETURNING *",
      [title, date_read, rating, summary]
    );
    console.log("Book added:", book.rows[0]);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding book:", error);
  }
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  console.log("Editing book:", id);
  try {
    const result = await db.query("SELECT * FROM books WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.render("form", { book: result.rows[0], editing: true });
  } catch (error) {
    console.error("Error fetching book for edit:", error);
    res.status(500).send("Error fetching book for edit");
  }
});

app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title, date_read, rating, summary } = req.body;
  console.log("Updating book:", id);
  try {
    await db.query(
      "UPDATE books SET title = $1, date_read=$2, rating=$3, summary=$4 WHERE id = $5",
      [title, date_read, rating, summary, id]
    );
    console.log("Book updated:", id);
    res.redirect("/");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Error updating book");
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.bookId;
  console.log("Deleting book:", id);
  try {
    await db.query("DELETE from books WHERE id=$1", [id]);
    console.log("Book deleted:", id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting book:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

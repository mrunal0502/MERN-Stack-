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

// const books = [
//   {
//     title: "Atomic Habits",
//     author: "James Clear",
//     date: "2025-06-08",
//     rating: 10,
//     summary:
//       "Atomic Habits by James Clear teaches how small daily habits, when done consistently, can lead to big changes over time. The book is practical, easy to understand, and full of real-life examples. It explains how to build good habits, break bad ones, and stay consistent with simple strategies.",
//   },

//   {
//     title: "Deep Work",
//     author: "Cal Newport",
//     date: "2025-07-15",
//     rating: 9,
//     summary:
//       "Deep Work highlights the power of focused, distraction-free work in a world full of interruptions. It teaches how to train your mind, build discipline, and produce high-quality results.",
//   },

//   {
//     title: "Ikigai",
//     author: "Héctor García & Francesc Miralles",
//     date: "2025-08-05",
//     rating: 8,
//     summary:
//       "Ikigai explores the Japanese concept of purpose and how it contributes to a long, happy life. It combines philosophy, culture, and personal insights to help readers find meaning in daily life.",
//   },
//   {
//     title: "The Almanack of Naval Ravikant",
//     author: "Eric Jorgenson",
//     date: "2025-08-08",
//     rating: 10,
//     summary:
//       "This book compiles the wisdom of Naval Ravikant on wealth, happiness, and life. It offers deep insights into building a rich life through leverage, decision-making, and self-awareness.",
//   },
// ];

app.get("/", async (req, res) => {
  try {
    // 1. Fetch all books from your database
    const output = await db.query("SELECT * FROM books ORDER BY date DESC");
    const books = output.rows;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

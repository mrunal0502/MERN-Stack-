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
//       "Deep Work by Cal Newport highlights the power of focused, distraction-free work in a world full of interruptions. It teaches how to train your mind, build discipline, and produce high-quality results.",
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

// async function fetchBookCover(title) {
//   const res = await fetch(
//     `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
//   );
//   const data = await res.json();
//   if (data.docs && data.docs.length > 0) {
//     const book = data.docs[0];
//     const coverId = book.cover_i;
//     if (coverId) {
//       return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
//     }
//   }
//   return "https://via.placeholder.com/200x280?text=No+Cover";
// }

// async function renderBooks(filteredBooks) {
//   const booksList = document.getElementById("books-list");
//   booksList.innerHTML = "";
//   for (const book of filteredBooks) {
//     const coverUrl = book.cover || (await fetchBookCover(book.title));
//     const card = document.createElement("div");
//     card.className = "book-card";
//     card.innerHTML = `
//       <img src="${coverUrl}" alt="Book Cover" />
//       <div class="book-info">
//         <h2>${book.title}</h2>
//         <p><strong>Date Read:</strong> ${book.date} | <strong>My rating:</strong> ${book.rating}/10</p>
//         <p>${book.summary}</p>
//       </div>
//     `;
//     booksList.appendChild(card);
//   }
//   if (filteredBooks.length === 0) {
//     booksList.innerHTML = '<p style="text-align:center;">No books found.</p>';
//   }
// }

// function filterBooks() {
//   const searchValue = document.getElementById("search-bar").value.toLowerCase();
//   const dateValue = document.getElementById("date-filter").value;
//   const ratingValue = document.getElementById("rating-filter").value;
//   let filtered = books.filter((book) => {
//     const matchesTitle = book.title.toLowerCase().includes(searchValue);
//     const matchesDate = dateValue ? book.date === dateValue : true;
//     const matchesRating = ratingValue
//       ? String(book.rating) === ratingValue
//       : true;
//     return matchesTitle && matchesDate && matchesRating;
//   });
//   renderBooks(filtered);
// }

// document.getElementById("search-bar").addEventListener("input", filterBooks);
// document.getElementById("date-filter").addEventListener("change", filterBooks);
// document
//   .getElementById("rating-filter")
//   .addEventListener("change", filterBooks);

// // Initial render
// renderBooks(books);

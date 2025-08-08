async function fetchBookCover(title) {
  const res = await fetch(
    `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
  );
  const data = await res.json();
  if (data.docs && data.docs.length > 0) {
    const book = data.docs[0];
    const coverId = book.cover_i;
    if (coverId) {
      return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    }
  }
  return "https://via.placeholder.com/200x280?text=No+Cover";
}

async function renderBooks(filteredBooks) {
  const booksList = document.getElementById("books-list");
  booksList.innerHTML = "";
  for (const book of filteredBooks) {
    const coverUrl = book.cover || (await fetchBookCover(book.title));
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${coverUrl}" alt="Book Cover" />
      <div class="book-info">
        <h2>${book.title}</h2>
        <p><strong>Date Read:</strong> ${book.date} | <strong>My rating:</strong> ${book.rating}/10</p>
        <p>${book.summary}</p>
      </div>
    `;
    booksList.appendChild(card);
  }
  if (filteredBooks.length === 0) {
    booksList.innerHTML = '<p style="text-align:center;">No books found.</p>';
  }
}

function filterBooks() {
  const searchValue = document.getElementById("search-bar").value.toLowerCase();
  const dateValue = document.getElementById("date-filter").value;
  const ratingValue = document.getElementById("rating-filter").value;
  let filtered = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(searchValue);
    const matchesDate = dateValue ? book.date === dateValue : true;
    const matchesRating = ratingValue
      ? String(book.rating) === ratingValue
      : true;
    return matchesTitle && matchesDate && matchesRating;
  });
  renderBooks(filtered);
}

document.getElementById("search-bar").addEventListener("input", filterBooks);
document.getElementById("date-filter").addEventListener("change", filterBooks);
document
  .getElementById("rating-filter")
  .addEventListener("change", filterBooks);

// Initial render
renderBooks(books);

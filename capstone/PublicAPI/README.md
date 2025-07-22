### 📄 `README.md`


# 🍹 Sip & Serve

Sip & Serve is a sleek and stylish cocktail recipe web application that fetches real-time data from [TheCocktailDB API](https://www.thecocktaildb.com/) to help users explore a variety of cocktails, view detailed recipes, and discover the Cocktail of the Week.

## 🚀 Features

- 🔍 **Explore Cocktails**: Browse through a collection of cocktails.
- 🥃 **Recipe Page**: Click on any cocktail to view detailed ingredients and preparation steps.
- 💡 **Cocktail of the Week**: Automatically showcases a special drink every week on the home page.
- 🎨 **Beautiful UI**: Clean, responsive interface built with EJS and styled using modern CSS principles.
- 📦 **Node.js + Express.js** backend.
- 🌐 **Public API Integration**: Uses TheCocktailDB to fetch cocktail data.

---

## 🖼️ Screenshots

### 🏠 Home Page

![Home Page](PublicAPI/screenshots/home.png)

### 🧾 Recipe Page

![Recipe Page](PublicAPI/screenshots/recipe.png)

### 🔍 Search Results

![Search Results](PublicAPI/screenshots/search.png)

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, EJS
- **Backend**: Node.js, Express.js
- **API**: [TheCocktailDB](https://www.thecocktaildb.com/)
- **Styling**: CSS Grid, Flexbox

---

## 📁 Project Structure

SipAndServe/
│
├── public/
│ ├── styles/
│ └── screenshots/
│
├── views/
│ ├── partials/
│ ├── explore.ejs
│ ├── recipe.ejs
│ └── index.ejs
│
├── routes/
│ └── main.js
│
├── app.js
├── package.json
└── README.md



---

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sip-and-serve.git
````

2. Navigate to the folder:

```bash
cd sip-and-serve
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 📬 API Reference

This project uses the following endpoints from TheCocktailDB:

- Search: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
- Lookup by ID: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`

---

## 👩‍💻 Author

Built with ❤️ by Mrunal Rawade

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).


---

Let me know if you want me to:

- Add the actual screenshots if you provide them.
- Push it to GitHub with a `.gitignore`.
- Auto-generate the Cocktail of the Week logic.

You're all set! 🥂


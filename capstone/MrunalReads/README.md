# 📖 Mrunal's Literary Gazette

A beautifully crafted full-stack book review platform inspired by vintage newspaper aesthetics. Track your reading journey, write thoughtful reviews, and discover your next great read—all within an elegant literary gazette experience.

## ✨ Features

### 📚 Book Management

- **Add New Books**: Submit detailed book reviews with ratings, dates, and cover images
- **Edit Reviews**: Update your thoughts and ratings as they evolve
- **Delete Books**: Remove books from your collection with confirmation dialogs
- **Book Covers**: Visual book cover integration for enhanced browsing

### 🔍 Advanced Search & Filtering

- **Title Search**: Find books by title with real-time search
- **Date Filtering**: Filter books by reading date
- **Rating System**: 10-point rating system with descriptive labels
- **Clear Filters**: One-click filter reset functionality

### 🎨 Vintage Newspaper Design

- **Authentic Typography**: Classic serif fonts (Playfair Display, Crimson Text)
- **Aged Paper Textures**: Subtle background patterns mimicking vintage paper
- **Newspaper Layout**: Master header with publication details and ornamental dividers
- **Responsive Design**: Beautiful on desktop, tablet, and mobile devices

### 💫 User Experience

- **Interactive Elements**: Hover effects, smooth animations, and visual feedback
- **Form Validation**: Client-side and server-side validation for data integrity
- **Accessibility**: Semantic HTML and proper contrast ratios
- **Performance**: Optimized images and efficient database queries

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Database for storing book data
- **EJS** - Templating engine for dynamic HTML

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with gradients, animations, and responsive design
- **JavaScript** - Interactive functionality and form handling
- **Google Fonts** - Typography (Playfair Display, Crimson Text)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mrunals-literary-gazette.git
   cd mrunals-literary-gazette
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   ```bash
   # Create PostgreSQL database
   createdb mrunal_reads

   # Run database schema (if you have a schema file)
   psql -d mrunal_reads -f schema.sql
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/mrunal_reads
   NODE_ENV=development
   ```

5. **Start the application**

   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 Database Schema

### Books Table

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date_read DATE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  summary TEXT NOT NULL,
);
```

## 📁 Project Structure

```
mrunals-literary-gazette/
├── public/
│   ├── styles/
│         ├── main.css
│         └── form.css
│
├── views/
│   ├── index.ejs
│   └── form.ejs
|
├── index.js
├── package.json
├── .env.example
└── README.md
```

## 🎯 API Endpoints

| Method | Endpoint    | Description               |
| ------ | ----------- | ------------------------- |
| GET    | `/`         | Display all books         |
| GET    | `/add`      | Show add book form        |
| POST   | `/add`      | Create new book review    |
| GET    | `/edit/:id` | Show edit book form       |
| POST   | `/edit/:id` | Update book review        |
| POST   | `/delete`   | Delete book review        |
| GET    | `/search`   | Search books with filters |

## 🎨 Design Philosophy

The design draws inspiration from classic literary publications and vintage newspapers:

- **Typography**: Elegant serif fonts create a sophisticated reading experience
- **Color Palette**: Warm, aged paper tones (#faf8f3, #8b7355, #2c2420)
- **Layout**: Traditional newspaper columns with modern responsive principles
- **Interactions**: Subtle animations that enhance without distracting

## 🔧 Customization

### Changing the Background

Replace the aged paper texture in your CSS:

```css
body {
  background: #faf8f3;
  background-image: ;
  /* Your custom background pattern here */
}
```

### Adding New Rating Descriptions

Update the rating guide in your forms:

```javascript
const ratingDescriptions = {
  10: "Masterpiece - Literary perfection",
  9: "Excellent - Highly recommended",
  // ... add your custom descriptions
};
```

## 🐛 Known Issues

- Book cover URLs must be valid image links
- Date picker formatting may vary between browsers
- Large summary texts may affect layout on very small screens

## 🚀 Future Enhancements

- [ ] User authentication and multiple user support
- [ ] Book recommendation system
- [ ] Reading goals and statistics
- [ ] Social sharing features
- [ ] Dark mode toggle
- [ ] Book cover upload functionality
- [ ] Reading progress tracking
- [ ] Book categories/genres
- [ ] Export reviews to PDF

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mrunal** - _Full Stack Developer_

- GitHub: [@yourusername](https://github.com/mrunal0502)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/mrunalrawade)

## 🙏 Acknowledgments

- Inspired by classic literary publications and vintage newspaper design
- Google Fonts for beautiful typography
- The open-source community for tools and inspiration
- My capstone advisors for guidance and support

## 📸 Screenshots

_Add screenshots of your application here to showcase the design and functionality_

---

⭐ **If you found this project helpful or interesting, please consider giving it a star!** ⭐

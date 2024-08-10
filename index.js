import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Create an Express application
const app = express();
const port = 5500;

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Serve the static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.ejs file
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs'; 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let post = {
  title: null,
  author: null,
  content: null
};

let listOfInfo = [];

// Home route
app.get("/", (req, res) => {
    res.render("index.ejs", { listOfInfo });
});


app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});


// Other routes
app.get("/about", (req, res) => {
    res.render("about.ejs");
});


app.get("/create", (req, res) => {
    res.render("create.ejs");
});


// Creating new post and redirecting to post page
app.post("/create", (req, res) => {
  post = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  };
  listOfInfo.push(post);
  res.redirect("/post");
});

// Displaying created post
app.get("/post", (req, res) => {
  res.render("created-post.ejs", post);
});


app.get("/article", (req, res) => {
  res.render("article.ejs", post);
});


app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});


app.get("/login", (req, res) => {
    res.render("login.ejs");
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
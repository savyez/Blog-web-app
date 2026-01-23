import express from 'express';
import bodyParser from 'body-parser';
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


let isLoggedIn = false;
app.use((_req, res, next) => {
  res.locals.isLoggedIn = isLoggedIn;
  next();
});

class Post {
    constructor(id, title, author, content) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
    }
}

let postInfo = [];

let User = {
  firstName: null,
  lastName: null,
  username: null,
  password: null
}

let userInfo = [];

function isGmail(email) {
  if (email.includes(" ")) return false;

  const domain = "@gmail.com";
  if (!email.endsWith(domain)) return false;

  const username = email.slice(0, -domain.length);
  if (username.length === 0) return false;

  return true;
}


// Home route
app.get("/", (_req, res) => {
    if (isLoggedIn) {
        res.render("index.ejs", { 
            posts: postInfo,
        });
    } else {
        res.redirect("/login");
    }
});


// Contact routes
app.get("/contact", (_req, res) => {
    res.render("contact.ejs");
});


// Handling contact form submission
app.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    if (!name || !email) {
        res.send("Name and email are required!");
        return;
    }
    if (!isGmail(email)) {
        res.send("Invalid email format! Please use a valid Gmail address.");
        return;
    }
    console.log(`Contact form submitted by ${name} with email ${email}`);
    res.send("Thank you for contacting us!");
});


// Other routes
app.get("/about", (_req, res) => {
    res.render("about.ejs");
});


// Displaying create post page
app.get("/create", (_req, res) => {
    res.render("create.ejs");
});


// Creating new post and redirecting to post page
app.post("/create", (req, res) => {
    const post = new Post(
    Date.now().toString(),
    req.body.title,
    req.body.author,
    req.body.content
  );
  postInfo.unshift(post);
  res.redirect("/post");
});


// Displaying created post
app.get("/post", (_req, res) => {
  if (postInfo.length === 0) {
    res.redirect("/");
    return;
  }
  res.render("created-post.ejs", {
    id: postInfo[0].id,
    title: postInfo[0].title,
    author: postInfo[0].author,
    content: postInfo[0].content
  });
});


// Displaying article edit page
app.get("/article/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = postInfo.find(p => p.id === postId);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});


// Displaying article page and sending post data
app.get("/article/:id", (req, res) => {
  const postId = req.params.id;
  const post = postInfo.find(p => p.id === postId);
  if (post) {
    res.render("article.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});


// Handling article edit data and redirecting to article page
app.post("/article/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = postInfo.find(p => p.id === postId);
    if (post) {
        post.title = req.body.title;
        post.author = req.body.author;
        post.content = req.body.content;
        res.redirect(`/article/${postId}`);
    } else {
        res.status(404).send("Post not found");
    }
});



// Displaying signup page
app.get("/signup", (_req, res) => {
    res.render("signup.ejs");
});


// Handling signup data and redirecting to login page
app.post("/signup", (req, res) => {
    User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    };
    console.log(User);
    userInfo.push(User);
    res.redirect("/login");
});


// Displaying login page
app.get("/login", (_req, res) => {
    res.render("login.ejs");
});


// Handling login data and User Authentication and redirecting to home page
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!User.username) {
        res.redirect("/signup");
        return;
    }
    
    if (username === User.username && password === User.password) {
        isLoggedIn = true;
        res.redirect("/");
    } else {
        res.send("Invalid credentials. Please try again.");
    }
});


// Handling logout and redirecting to home page
app.get("/logout", (_req, res) => {
  isLoggedIn = false;
  res.redirect("/");
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
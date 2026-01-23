# Blog Web Application (Node.js + Express + EJS)

A simple blog web application built using **Node.js**, **Express**, and **EJS**, currently using **in-memory storage** for learning and prototyping purposes.

This project demonstrates routing, templating, authentication basics, CRUD operations, and form handling without a database.

---

## 📁 Project Structure

```text
.
├── index.js                 # Main Express server and routes
├── public/                  # Static assets (CSS, images, JS)
│   └── styles/
├── views/
│   ├── index.ejs             # Home page (lists posts)
│   ├── article.ejs           # View a single post
│   ├── create.ejs            # Create post form
│   ├── edit.ejs              # Edit post form
│   ├── created-post.ejs      # Post creation success / redirect view
│   ├── contact.ejs           # Contact form
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── README.md
└── package.json
```

---

## 🔁 Routes Summary

### Blog & Pages

* `GET /`
  Home page (lists posts; redirects to `/login` if not logged in)

* `GET /create`
  Show create post form

* `POST /create`
  Create a new post (stored in memory) and redirect to post

* `GET /post`
  Show the most recently created post

* `GET /article/:id`
  View a single post

* `GET /article/edit/:id`
  Show edit form for a post

* `POST /article/edit/:id`
  Update a post and redirect to updated view

* `POST /article/delete/:id`
  Delete a post (uses POST to avoid destructive GET requests)

---

### Authentication

* `GET /signup`
  Signup page

* `POST /signup`
  Signup (in-memory user storage)

* `GET /login`
  Login page

* `POST /login`
  Login using a global user object

---

### Contact

* `GET /contact`
  Contact form

* `POST /contact`
  Contact form submission (basic Gmail-format validation)

---

📸 Screenshots

Below are sample screenshots of the application.
(Place images inside a /screenshots folder in the project root.)

🏠 Home Page
![Home Page](<img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/3f662161-e923-40f6-b506-c44be2ccb70a" />)
✍️ Create Post
![Create Post](<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/1edcdc0a-c5dd-4cab-85a7-a3ae315ddf98" />
)
📄 View Post
![View Post](<img width="1918" height="910" alt="image" src="https://github.com/user-attachments/assets/59e6604e-bdb4-4e8f-981a-f54680844905" />
)
✏️ Edit Post
![Edit Post](<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/25be3b5b-1c22-4856-b21c-46ea5bbfd5a5" />
)
📬 Contact Page
![Contact Page](<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/19fa8ff5-912d-4e02-bd24-5c869455147d" />
)

---

## ⚠️ Known Issues & Short-Term Limitations

* **Global login state**

  * `isLoggedIn` is a single global boolean
  * Not session-aware (shared across all users)

* **Single user storage**

  * `userInfo` is overwritten on every signup
  * Only the most recent user can log in

* **In-memory storage**

  * Posts and users are lost on server restart

* **Plaintext passwords**

  * No hashing or salting

* **ID generation**

  * Uses `Date.now().toString()`
  * Not safe for concurrent production usage

* **Minimal input validation**

  * Potential XSS if raw output is rendered

* **Template inconsistency**

  * Some templates expect a `post` object
  * Others expect individual variables

---


## 🚀 Roadmap: Moving to a Production-Ready App

### 1. Choose a Database & ORM

* **Relational**

  * PostgreSQL + Prisma or Sequelize
* **Document**

  * MongoDB + Mongoose

### 2. Replace In-Memory Storage

* Replace `postInfo` → `Post` model
* Replace `userInfo` → `User` model

### 3. Authentication & Sessions

* Use `express-session` (or JWT)
* Store `req.session.userId`
* Remove global `isLoggedIn`

### 4. Password Security

* Hash passwords with **bcrypt**
* Compare hashes on login

### 5. Authorization

* Only allow post owners to edit/delete

### 6. IDs

* Use DB-generated IDs

  * UUIDs or auto-incremented IDs

### 7. Validation & Security

* Input validation with `express-validator`
* CSRF protection using `csurf`
* Add Helmet for HTTP hardening
* Add rate limiting

### 8. Dev & Prod Improvements

* Migrations & seed data
* Centralized error handling
* Logging (e.g., morgan, winston)

---

## 🔐 Security Notes

* Never store secrets in code

  * Use environment variables (`.env`)
* Hash all passwords
* Enable CSRF protection on authenticated POST routes
* Use secure cookies in production

---



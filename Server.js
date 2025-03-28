const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; // Temporary storage

// Home Page
app.get("/", (req, res) => {
    res.render("index", { posts });
});

// New Post Form
app.get("/new", (req, res) => {
    res.render("new");
});

// Add New Post
app.post("/add", (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: posts.length + 1, title, content });
    res.redirect("/");
});

// Edit Post Form
app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id == Number(req.params.id));
    res.render("edit", { post });
});

// Update Post
app.post("/update/:id", (req, res) => {
    const { title, content } = req.body;
    posts = posts.map(post =>
        post.id == Number(req.params.id) ? { ...post, title, content } : post
    );
    res.redirect("/");
});

// Delete Post
app.post("/delete/:id", (req, res) => {
    posts = posts.filter(post => post.id != Number(req.params.id));
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

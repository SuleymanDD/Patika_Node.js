
const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const ejs = require('ejs');
const pageController = require("./controllers/pageController");
const postController = require("./controllers/postController");

const app = express();

mongoose.connect("mongodb://localhost/cleanblog-test-db");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));

app.set('view engine','ejs');

app.get("/posts/:id", pageController.getPost);
app.get('/about', pageController.getAbout);
app.get('/add_post', pageController.getAddPost);
app.get('/posts/edit/:id', pageController.getEdit);

app.get('/', postController.getAllPosts);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} numaralı portta başlatıldı..`);
});
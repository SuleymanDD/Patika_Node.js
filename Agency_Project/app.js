const express = require('express');
const mongoose = require("mongoose");
const ejs = require("ejs");
const methodOverride = require('method-override');
const dotenv = require("dotenv");

const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController")

const app = express();
dotenv.config();

const dbDirection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wrj7jcn.mongodb.net/?appName=Cluster0` 
mongoose.connect(dbDirection)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log(err);
    })

// MiddleWears
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));

// Template Engine
app.set("view engine", "ejs");

app.get("/", postController.getAllPosts);
app.post("/posts", postController.createPost);

app.get("/addPost", pageController.getAddPost);



app.listen(process.env.PORT || 4000, () => {
    console.log("Sunucu çalisiyor... http://localhost:4000");
})


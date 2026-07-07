const express = require("express")
const ejs = require("ejs");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

const pageController = require("./controllers/pageController");
const postController = require("./controllers/postController");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
});

// MiddleWears
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));

app.set("view engine", "ejs");

app.get("/", postController.getAllPosts);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/post/:id", postController.deletePost);

app.get("/addPost", pageController.getAddPage);
app.get("/post/edit/:id", pageController.getEditPage);


app.listen(process.env.PORT || 5000, () => {
    console.log("Sunucu başlatıldı... http://localhost:5000");
})
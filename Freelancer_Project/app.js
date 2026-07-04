const express = require("express")
const ejs = require("ejs");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
/*app.use(methodOverride('_method'), {
    methods: ["POST", "GET"]
});*/

app.set("view engine", "ejs");

app.get("/", postController.getAllPosts);


app.listen(process.env.PORT || 5000, () => {
    console.log("Sunucu başlatıldı... http://localhost:5000");
})
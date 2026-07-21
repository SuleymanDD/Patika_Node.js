const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv")

const pageController = require("./controllers/pageController");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {console.log("Db Connected!")}).catch((e) => console.log(e));

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", pageController.getHomePage);
app.get("/about", pageController.getAboutPage);
app.get("/furnitures", pageController.getFurnituresPage);
app.get("/contact", pageController.getContactPage);

app.listen(process.env.PORT || 4000, () => {
    console.log("Sunucu başlatıldı...");
})


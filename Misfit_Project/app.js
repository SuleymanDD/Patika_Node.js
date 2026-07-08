const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");

const pageController = require("./controllers/pageController");

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
/*app.use(methodOverride(_method, {
    methods: ["POST", "GET"]
}));*/

app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("index", { pageName: "home" });
})

app.get("/about", pageController.getAboutPage);
app.get("/contact", pageController.getContactPage);
app.get("/gallery", pageController.getGalleryPage);
app.get("/trainer", pageController.getTrainerPage);

app.listen(process.env.PORT || 4000, () => {
    console.log("Sunucu başlatılıyor... http://localhost:4000");
})
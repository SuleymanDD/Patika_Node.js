const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const flash = require('connect-flash');
const session = require('express-session');

const pageController = require("./controllers/pageController");
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
/*app.use(methodOverride(_method, {
    methods: ["POST", "GET"]
}));*/
app.use(session({
  secret: 'gizli_AHah', // İstediğiniz gizli bir kelimeyi yazın
  resave: false,
  saveUninitialized: true
}));

mongoose.connect(process.env.MONGODB_URI).then(() => { console.log("Db Connected!!") }).catch((e) => console.log("Hata var -> ",e));

app.set("view engine", "ejs");

app.post("/user/signup", authController.signup);
app.post("/user/login", authController.login);
app.get("/profile", profileController.getAllCourses);

app.get("/", pageController.getMainPage);
app.get("/about", pageController.getAboutPage);
app.get("/contact", pageController.getContactPage);
app.get("/gallery", pageController.getGalleryPage);
app.get("/trainer", pageController.getTrainerPage);
app.get("/signup", pageController.getSignupPage);
app.get("/login", pageController.getLoginPage);
app.get("/addCourse", pageController.getAddCoursePage);

app.listen(process.env.PORT || 4000, () => {
    console.log("Sunucu başlatılıyor... http://localhost:4000");
})
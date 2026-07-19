const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const flash = require('connect-flash');
const session = require('express-session');

const pageController = require("./controllers/pageController");
const authController = require("./controllers/authController");
const courseController = require("./controllers/courseController");

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(methodOverride("_method", {
    methods: ["POST", "GET"]
}));
app.use(session({
  secret: 'gizli_AHah', // İstediğiniz gizli bir kelimeyi yazın
  resave: false,
  saveUninitialized: true
}));

mongoose.connect(process.env.MONGODB_URI).then(() => { console.log("Db Connected!!") }).catch((e) => console.log("Hata var -> ",e));

app.set("view engine", "ejs");

app.post("/user/signup", authController.signup);
app.post("/user/login", authController.login);
app.get("/logout", authController.logout);
app.put("/update/user", authController.editUser);
app.delete("/delete/user", authController.deleteUser);

app.get("/profile", courseController.getCourses);
app.get("/courses", courseController.getAllCourses);
app.post("/courses", courseController.createCourse);
app.put("/courses/:id", courseController.updateCourse);
app.delete("/courses/:id", courseController.deleteCourse);

app.get("/signupCourse/:id", courseController.signupCourse);
app.delete("/signoutCourse/:id", courseController.signoutCourse);

app.get("/", pageController.getMainPage);
app.get("/about", pageController.getAboutPage);
app.get("/contact", pageController.getContactPage);
app.get("/gallery", pageController.getGalleryPage);
app.get("/trainer", pageController.getTrainerPage);
app.get("/signup", pageController.getSignupPage);
app.get("/login", pageController.getLoginPage);
app.get("/addCourse", pageController.getAddCoursePage);
app.get("/edit/user", pageController.getEditUserPage);
app.get("/edit/course/:id", pageController.getEditCoursePage);

app.listen(process.env.PORT || 4000, () => {
    console.log("Sunucu başlatılıyor... http://localhost:4000");
})
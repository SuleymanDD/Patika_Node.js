const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv")
const mehodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

const pageController = require("./controllers/pageController");
const authController = require("./controllers/authController");
const panelController = require("./controllers/panelController");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {console.log("Db Connected!")}).catch((e) => console.log(e));

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(flash());
app.use(session({
  secret: 'gizli_AHah', // İstediğiniz gizli bir kelimeyi yazın
  resave: false,
  saveUninitialized: true
}));
app.use(mehodOverride("_method", {
  methods: ["POST", "GET"]
}));

app.set("view engine", "ejs");

app.post("/signup", authController.signup);
app.post("/login", authController.login);
app.get("/logout", authController.logout);
app.delete("/delete/user", authController.deleteUser);

app.get("/panel", panelController.getPanelPage);
app.post("/create/furniture", panelController.createFurniture);
app.put("/update/furniture/:id", panelController.updateFurniture);
app.delete("/delete/furniture/:id", panelController.deleteFurniture);

app.get("/", pageController.getHomePage);
app.get("/about", pageController.getAboutPage);
app.get("/furnitures", pageController.getFurnituresPage);
app.get("/contact", pageController.getContactPage);
app.get("/signup", pageController.getSignupPage);
app.get("/login", pageController.getLoginPage);
app.get("/profile", pageController.getProfilePage);


app.listen(process.env.PORT || 4000, () => {
    console.log("Sunucu başlatıldı...");
})


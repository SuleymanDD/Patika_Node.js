const User = require("../models/User");

exports.getHomePage = (req, res) => {
    res.render("index", { pageName: "home", userID: req.session.userID,  message: req.flash("homeMessage")[0]});
}

exports.getAboutPage = (req, res) => {
    res.render("about", { pageName: "about", userID: req.session.userID });
}

exports.getFurnituresPage = (req, res) => {
    res.render("furnitures", { pageName: "furnitures", userID: req.session.userID });
}

exports.getContactPage = (req, res) => {
    res.render("contact", { pageName: "contact", userID: req.session.userID });
}

exports.getSignupPage = (req, res) => {
    res.render("signup", { pageName: "signup", userID: req.session.userID, message: req.flash("signupMessage") });
}

exports.getLoginPage = (req, res) => {
    res.render("login", { pageName: "login", userID: req.session.userID, message: req.flash("loginMessage")[0] });
}

exports.getProfilePage = async (req, res) => {
    if (req.session.userID) {
        const user = await User.findOne({_id: req.session.userID});
        res.render("profile", { pageName: "profile", userID: req.session.userID, user });
    }else{
        req.flash("loginMessage", {msg:"Kullanıcı Girişi Yapılmalıdır!!",type: "info"});
        res.redirect("/login");
    }
}
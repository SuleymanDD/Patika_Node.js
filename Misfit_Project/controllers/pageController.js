const flash = require('connect-flash');

exports.getAboutPage = (req,res) => {
    res.render("about", { pageName: "about", userId: req.session.userId });
}

exports.getContactPage = (req,res) => {
    res.render("contact", { pageName: "contact", userId: req.session.userId });
}

exports.getGalleryPage = (req,res) => {
    res.render("gallery", { pageName: "gallery", userId: req.session.userId });
}

exports.getTrainerPage = (req,res) => {
    res.render("trainer", { pageName: "trainer", userId: req.session.userId });
}

exports.getSignupPage = (req,res) => {
    res.render("signup", { pageName: "signup", message: req.flash("nameValErr"), userId: req.session.userId });
}

exports.getLoginPage = (req,res) => {
    res.render("login", { pageName: "login", message: req.flash("loginErr"), userId: req.session.userId });
}

exports.getProfilePage = (req,res) => {
    if(!req.session.userId){
        req.flash("loginErr", "Lütfen profil'e erişmek için giriş yapın!!");
        res.status(400).redirect("/login");
    }else{
        res.render("profile", { pageName: "profile", userId: req.session.userId });
    }
}
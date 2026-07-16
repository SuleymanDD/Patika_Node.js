const flash = require('connect-flash');
const User = require("../models/User");

exports.getMainPage = async(req,res) => {
    res.render("index", { pageName: "home", message: req.flash("mainErr"), userId: req.session.userId });
}

exports.getAboutPage = (req, res) => {
    res.render("about", { pageName: "about", userId: req.session.userId });
}

exports.getContactPage = (req, res) => {
    res.render("contact", { pageName: "contact", userId: req.session.userId });
}

exports.getGalleryPage = (req, res) => {
    res.render("gallery", { pageName: "gallery", userId: req.session.userId });
}

exports.getTrainerPage = (req, res) => {
    res.render("trainer", { pageName: "trainer", userId: req.session.userId });
}

exports.getSignupPage = (req, res) => {
    res.render("signup", { pageName: "signup", message: req.flash("nameValErr"), userId: req.session.userId });
}

exports.getLoginPage = (req, res) => {
    res.render("login", { pageName: "login", message: req.flash("loginErr"), userId: req.session.userId });
}

exports.getAddCoursePage = async (req, res) => {
    try {
        if (req.session.userId) {
            const user = await User.findOne({ _id: req.session.userId });
            if (user.role === "trainer") {
                res.render("addCourse", { pageName: "addCourse", userId: req.session.userId });
            } else {
                req.flash("mainErr", "Kurs eklemek için antrenör hesabı gereklidir!!");
                res.status(400).redirect("/");
            }
        } else {
            req.flash("loginErr", "Kurs ekleme sayfasına erişebilmek için antrenör hesabınıza giriş yapın!!");
            res.status(400).redirect("/login");
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}

exports.getEditUserPage = async (req, res) => {
    try {
        if (req.session.userId) {
            const user = await User.findOne({ _id: req.session.userId });
            res.render("editUser", { pageName: "editUser", user, userId: req.session.userId });
        }else{
            req.flash("loginErr", "Hesap bilgilerini güncellemek için giriş yapın!!");
            res.status(400).redirect("/login");
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}
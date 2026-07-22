
exports.getHomePage = (req, res) => {
    res.render("index", {pageName: "home", userID: req.session.userID});
}

exports.getAboutPage = (req, res) => {
    res.render("about", {pageName: "about", userID: req.session.userID});
}

exports.getFurnituresPage = (req, res) => {
    res.render("furnitures", {pageName: "furnitures", userID: req.session.userID});
}

exports.getContactPage = (req, res) => {
    res.render("contact", {pageName: "contact", userID: req.session.userID});
}

exports.getSignupPage = (req, res) => {
    res.render("signup", {pageName: "signup", userID: req.session.userID, message: req.flash("signupMessage")});
}

exports.getLoginPage = (req, res) => {
    res.render("login", {pageName: "login", userID: req.session.userID, message: req.flash("loginMessage")[0]});
}
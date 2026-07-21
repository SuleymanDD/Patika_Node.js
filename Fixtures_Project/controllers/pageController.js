
exports.getHomePage = (req, res) => {
    res.render("index", {pageName: "home"});
}

exports.getAboutPage = (req, res) => {
    res.render("about", {pageName: "about"});
}

exports.getFurnituresPage = (req, res) => {
    res.render("furnitures", {pageName: "furnitures"});
}

exports.getContactPage = (req, res) => {
    res.render("contact", {pageName: "contact"});
}
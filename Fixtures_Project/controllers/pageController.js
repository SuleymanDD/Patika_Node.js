
exports.getHomePage = (req, res) => {
    res.render("index");
}

exports.getAboutPage = (req, res) => {
    res.render("about");
}

exports.getFurnituresPage = (req, res) => {
    res.render("furnitures");
}

exports.getContactPage = (req, res) => {
    res.render("contact");
}
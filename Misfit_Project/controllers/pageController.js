
exports.getAboutPage = (req,res) => {
    res.render("about", { pageName: "about" });
}

exports.getContactPage = (req,res) => {
    res.render("contact", { pageName: "contact" });
}

exports.getGalleryPage = (req,res) => {
    res.render("gallery", { pageName: "gallery" });
}

exports.getTrainerPage = (req,res) => {
    res.render("trainer", { pageName: "trainer" });
}
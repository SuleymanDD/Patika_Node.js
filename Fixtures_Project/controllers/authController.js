const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    
    const isMailExist = await User.find({ mail: req.body.mail });
    if (isMailExist.length) {
        req.flash("signupMessage", "Mail adresi ile mevcut bir hesap bulunmaktadır.");
        return res.redirect("/signup");
    }

    if (req.body.password !== req.body.confirmPassword) {
        req.flash("signupMessage", "Şifreler eşleşmiyor!!");
        return res.redirect("/signup");
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) console.log(err)
        bcrypt.hash(req.body.password, salt, async (error, hash) => {
            if (error) console.log(error)
            const password = hash.toString();
            const user = await User.create({ ...req.body, password });
            res.status(200).redirect("/");
        });
    });

}
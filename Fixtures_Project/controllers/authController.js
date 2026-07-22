const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    try {
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
                req.flash("loginMessage", {msg: "Kayıt Başarılı!!!", type: "success"});
                res.status(200).redirect("/login");
            });
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ mail: req.body.mail });

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (err) console.log(err)

                if (same) {
                    req.session.userID = user._id;
                    res.status(200).redirect("/");
                } else {
                    req.flash("loginMessage", {msg: "Mail adresi veya şifre hatalı. Tekrar Deneyin!!", type: "error"});
                    res.status(400).redirect("/login");
                }
            })
        } else {
            req.flash("loginMessage", {msg: "Mail adresi veya şifre hatalı. Tekrar Deneyin!!", type: "error"});
            res.status(400).redirect("/login");
        }
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error
        });
    }
}
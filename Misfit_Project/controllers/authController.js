const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    try {
        const isNameUnique = await User.find({ name: req.body.name });
        if (isNameUnique.length == 0) {
            let password = req.body.password;
            bcrypt.genSalt(10, function (err, salt) {
                if (err) console.log(err)
                bcrypt.hash(password, salt, async (error, hash) => {
                    if (error) console.log(error)
                    password = hash.toString();
                    const user = await User.create({ ...req.body, password });
                });
            });
            res.redirect("/login");
        } else {
            req.flash("nameValErr", "Başka bir isim girin!!");
            res.status(400).redirect("/signup");
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });

        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    req.session.userId = user._id;
                    req.session.userRole = user.role;
                    res.redirect("/");
                } else {
                    req.flash("loginErr", "Kullanıcı ismi veya şifre yanlış tekrar deneyin!!");
                    res.status(400).redirect("/login");
                }
            })
        } else {
            req.flash("loginErr", "Kullanıcı ismi veya şifre yanlış tekrar deneyin!!");
            res.status(400).redirect("/login");
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Session silinirken hata oluştu:", err);
            return res.status(500).send("Çıkış yapılamadı.");
        }

        // 'connect.sid', express-session'ın varsayılan çerez ismidir
        res.clearCookie('connect.sid');

        res.redirect('/');
    })
}

exports.editUser = async (req, res) => {
    try {
        console.log("gelen veri", req.body)
        const beforeUser = await User.findOne({ _id: req.session.userId });
        let password = beforeUser.password;

        if (beforeUser.name !== req.body.name) {
            const isNameUnique = await User.find({ name: req.body.name });
            if (isNameUnique.length > 0) { //İf name doesn't unique
                req.flash("editUserErr", "Başka bir isim girin!!");
                return res.status(400).redirect("/editUser");
            }
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            req.flash("editUserErr", "Şifreler eşleşmiyor!!");
            return res.status(400).redirect("/editUser");
        }

        if (req.body.newPassword.length > 0 && req.body.newPassword === req.body.confirmPassword) {
            password = req.body.newPassword;
            bcrypt.genSalt(10, function (err, salt) {
                if (err) console.log(err)
                bcrypt.hash(password, salt, async (error, hash) => {
                    if (error) console.log(error)
                    password = hash.toString();
                });
            });
        }

        await User.findByIdAndUpdate(req.session.userId, {
            ...req.body,
            password
        });

        res.status(200).redirect("/profile");
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}
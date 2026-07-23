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
                    if(user._id.toString() === process.env.ADMIN_ID){
                        res.status(200).redirect("/panel");
                    }else{
                        req.flash("homeMessage", {msg: "Başarıyla giriş sağlandı!!", type: "success"});
                        res.status(200).redirect("/");
                    }
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

exports.logout = (req, res) => {
    clearSession(req, res, "/");
}

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete({_id: req.session.userID});
    clearSession(req, res, "/");
}

function clearSession(req, res, redirectTo){
    req.session.destroy((err)=> {
        if(err){
            console.log("Session verisi silinemedi!!", err);
            return res.status(500).send("Çıkış Yapılamadı!!");
        }

        // 'connect.sid', express-session'ın varsayılan çerez ismidir
        res.clearCookie('connect.sid');

        res.status(201).redirect(redirectTo);
    })
}
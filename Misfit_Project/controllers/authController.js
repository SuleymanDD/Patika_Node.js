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

exports.logout= async(req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.error("Session silinirken hata oluştu:", err);
            return res.status(500).send("Çıkış yapılamadı.");
        }

        // 'connect.sid', express-session'ın varsayılan çerez ismidir
        res.clearCookie('connect.sid');

        res.redirect('/');
    })
}
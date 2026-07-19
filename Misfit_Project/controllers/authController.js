const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendMail");

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
    clearSession(req, res, redirectTo = "/login");
}

exports.editUser = async (req, res) => {
    try {
        const beforeUser = await User.findOne({ _id: req.session.userId });

        if (beforeUser.name !== req.body.name) {
            const isNameUnique = await User.find({ name: req.body.name });
            if (isNameUnique.length > 0) { //İf name doesn't unique
                req.flash("editUserErr", "Başka bir isim girin!!");
                return res.status(400).redirect("/edit/user");
            }
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            req.flash("editUserErr", "Şifreler eşleşmiyor!!");
            return res.status(400).redirect("/edit/user");
        }



        if (req.body.newPassword.length > 0 && req.body.newPassword === req.body.confirmPassword) {
            let password = req.body.newPassword;
            bcrypt.genSalt(10, function (err, salt) {
                if (err) console.log(err)
                bcrypt.hash(password, salt, async (error, hash) => {
                    if (error) console.log(error)
                    password = hash.toString();
                    console.log("oldu bu iş")

                    await User.findByIdAndUpdate(req.session.userId, {
                        ...req.body,
                        password
                    });

                    res.status(200).redirect("/profile");
                });
            });
        }
        
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error
        });
    }
}

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete({ _id: req.session.userId });
    clearSession(req, res, redirectTo = "/");
}

exports.sendEmail = async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    try {
        // Hazırladığımız mail fonksiyonuna form verilerini gönderiyoruz
        await sendEmail({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        });

        // Mail başarıyla giderse kullanıcıya olumlu dönüş yap veya sayfayı yenile
        req.flash("mainErr", "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapılacaktır.");
        res.status(200).redirect("/");
        
    } catch (error) {
        console.error("Mail gönderme hatası:", error);
        res.status(500).json({ success: false, message: 'Mail gönderilirken bir hata oluştu.' });
    }
}


function clearSession(req, res, redirectTo) {
    req.session.destroy((err) => {
        if (err) {
            console.error("Session silinirken hata oluştu:", err);
            return res.status(500).send("Çıkış yapılamadı.");
        }

        // 'connect.sid', express-session'ın varsayılan çerez ismidir
        res.clearCookie('connect.sid');

        res.status(201).redirect(redirectTo);
    });
}


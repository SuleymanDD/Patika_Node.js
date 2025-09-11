// const nodemailer = require("nodemailer");
const Course = require("../models/Course");
const User = require("../models/User");

exports.getIndexPage = async(req, res) => {
    const courses = await Course.find().sort("-dateCreated").limit(2);
    const totalCourses = await Course.find().countDocuments();
    const totalStudents = await User.countDocuments({role: "student"});
    const totalTeachers = await User.countDocuments({role: "teacher"});
    
    res.render("index", {
        courses,
        totalCourses,
        totalStudents,
        totalTeachers,
        page_name: "index"
    });
};
exports.getAboutPage = (req, res) => {
    res.render("about", {
        page_name: "about"
    });
};
exports.getRegisterPage = (req, res) => {
    res.render("register", {
        page_name: "register"
    });
};
exports.getLoginPage = (req, res) => {
    res.render("login", {
        page_name: "login"
    });
};
exports.getContactPage = (req, res) => {
    res.render("contact", {
        page_name: "contact"
    });
};
exports.sendEmail = (req, res) => {
    try {
        console.log("Mail Sended!");
        /*const outputMessage = `
        <h1>Mail Details </h1>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h1>Message</h1>
        <p>${req.body.message}</p>
        `
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "**@gmail.com",
                pass: "**",
            },
        });
    
        // Wrap in an async IIFE so we can use await.
        (async () => {
            const info = await transporter.sendMail({
                from: '"SmartEdu" <**@gmail.com>',
                to: "***@gmail.com",
                subject: "SmartEdu Message ✔",
                html: outputMessage, // HTML body
            });
    
            console.log("Message sent:", info.messageId);
        })();
        */
        req.flash("success", "We Received your message succesfully");
        res.status(200).redirect("contact");
    } catch (error) {
        req.flash("error", "Something Happend!");
        res.status(200).redirect("contact");
    }

};
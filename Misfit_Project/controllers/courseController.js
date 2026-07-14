const Course = require("../models/Course")

exports.createCourse = async(req,res) => {
    await Course.create({
        ...req.body,
        user: req.session.userId
    });
    res.status(200).redirect("/profile");
}
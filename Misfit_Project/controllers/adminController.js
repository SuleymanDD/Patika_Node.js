const User = require("../models/User");
const Course = require("../models/Course");

exports.deleteUser = async(req, res) => {
    await User.findByIdAndDelete({_id: req.params.id});
    await Course.deleteMany({user: req.params.id});

    res.status(200).redirect("/panel");
}

exports.deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete({_id: req.params.id}, {new: true});

    res.status(200).redirect("/panel");
}
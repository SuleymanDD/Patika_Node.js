const Course = require("../models/Course");
const User = require("../models/User");

exports.getAllCourses = async(req, res)=>{
    if(!req.session.userId){
        req.flash("loginErr", "Lütfen profil'e erişmek için giriş yapın!!");
        res.status(400).redirect("/login");
    }else{ // İf there is a user
        let courses;
        const user= await User.findOne({_id: req.session.userId});
        switch(user.role){
            case "student":
                courses = await Course.find({_id: {$in: user.courses}}).sort({dateCreated: -1});
            break;
            case "trainer":
                courses = await Course.find({user: req.session.userId}).sort({dateCreated: -1});
            break;
            default:
                courses = [];
            break;
        }
        res.render("profile", { pageName: "profile", user, courses, userId: req.session.userId, userRole: req.session.userRole });
    }
}
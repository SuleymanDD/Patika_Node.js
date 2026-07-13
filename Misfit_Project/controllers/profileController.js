const Course = require("../models/Course");
const User = require("../models/User");

exports.getAllCourses = async(req, res)=>{
    if(!req.session.userId){
        req.flash("loginErr", "Lütfen profil'e erişmek için giriş yapın!!");
        res.status(400).redirect("/login");
    }else{ // İf there is a user
        let courses;
        const user= await User.find({_id: req.session.userId});
        switch(user.role){
            case "student":
                courses = await Course.find({_id: {$in: user.courses}})
            break;
            case "trainer":
                courses = await Course.find({_id: req.session.userId});
            break;
        }
        res.render("profile", { pageName: "profile", courses,userId: req.session.userId });
    }
}
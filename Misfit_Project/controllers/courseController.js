const Course = require("../models/Course")
const User = require("../models/User");

exports.getAllCourses = async (req, res) => {
    const courses = await Course.find({}).sort({ dateCreated: -1 }).populate("user");

    let signupedCourses = [];
    if (req.session.userRole === "student") {
        const user = await User.findOne({ _id: req.session.userId });
        signupedCourses = user.courses;
    }

    res.render("courses", { pageName: "courses", courses, signupedCourses, userId: req.session.userId, userRole: req.session.userRole, message: req.flash("courseErr") });
}

exports.getCourses = async (req, res) => {
    if (!req.session.userId) {
        req.flash("loginErr", "Lütfen profil'e erişmek için giriş yapın!!");
        res.status(400).redirect("/login");
    } else { // İf there is a user
        let courses;
        const user = await User.findOne({ _id: req.session.userId });
        switch (user.role) {
            case "student":
                courses = await Course.find({ _id: { $in: user.courses } }).sort({ dateCreated: -1 });

                // Sistem de öğrencilerin kayıtlı olduğu kurslar silidniğinde veritabanında eski kurs idlerinin birikmemesi için düzenlenmiş bir işlemdir.
                if (courses.length > 0) {
                    checkOldCourseIds(user, courses);
                }

                break;
            case "trainer":
                courses = await Course.find({ user: req.session.userId }).sort({ dateCreated: -1 });
                break;
            default:
                courses = [];
                break;
        }
        res.render("profile", { pageName: "profile", user, courses, userId: req.session.userId, userRole: req.session.userRole });
    }
}

exports.createCourse = async (req, res) => {
    await Course.create({
        ...req.body,
        user: req.session.userId
    });
    res.status(200).redirect("/profile");
}

exports.updateCourse = async (req, res) => {
    await Course.findByIdAndUpdate({ _id: req.params.id }, req.body);

    if (req.session.userRole === "admin") {
        res.status(200).redirect("/panel");
    } else {
        res.status(200).redirect("/profile");
    }
}

exports.deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete({ _id: req.params.id }, { new: true });
    res.status(200).redirect("/profile");
}

// Bu metoda sadece kullanıcı girişi yapmayan veya öğrenci girişi yapanlar geliyor.
exports.signupCourse = async (req, res) => {
    if (req.session.userRole !== "student") {
        req.flash("courseErr", "Kursa kayıt olabilmek için öğrenci hesabına giriş yapmalısın!!!");
        return res.status(400).redirect("/courses");
    }

    const user = await User.findOne({ _id: req.session.userId });
    user.courses.push(req.params.id);
    await user.save();
    res.status(200).redirect("/courses");
}

exports.signoutCourse = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userId });
    user.courses = user.courses.filter((e) => {
        if (e !== null) e = e.toString();
        return e !== req.params.id
    });
    await user.save();
    res.status(200).redirect("/profile");
}

async function checkOldCourseIds(user, allCourses) {
    user.courses = user.courses.filter((e) => {
        if (e !== null) e = e.toString();
        const isExist = allCourses.find((course) => course._id.toString() === e);
        return isExist;
    });
    await user.save();
}

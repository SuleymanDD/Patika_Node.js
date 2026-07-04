const Post = require("../models/Post");
const fs = require("fs");

exports.getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const posts = await Post.find({}).sort({ dateCreated: -1 });

    const postPerPage = 6;
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / postPerPage);

    const firstIndex = (page - 1) * postPerPage;
    const lastIndex = firstIndex + postPerPage;
    const displayedPosts = posts.slice(firstIndex, lastIndex);

    res.render("index", { posts: displayedPosts , currentPage: page, totalPages });
}

exports.createPost = async(req, res) => {
    const uploadsDir = "public/uploads/"
    if(!fs.existsSync(uploadsDir)){
        fs.mkdirSync(uploadsDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname+"/../public/uploads/"+uploadImage.name;

    uploadImage.mv(uploadPath, async () => {
        await Post.create({
            ...req.body,
            img: "/uploads/"+uploadImage.name
        });
        res.redirect("/");
    })
}
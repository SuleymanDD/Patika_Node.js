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

    res.render("index", { posts: displayedPosts, currentPage: page, totalPages });
}

exports.createPost = async (req, res) => {
    const uploadsDir = "public/uploads/"
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).send("No file uploaded.");
        }
        let uploadImage = req.files.image;
        let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;

        uploadImage.mv(uploadPath, async () => {
            await Post.create({
                ...req.body,
                img: "/uploads/" + uploadImage.name
            });
            res.redirect("/");
        });
    } catch (err) {
        console.log(err);
    }

}

exports.updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post.img.slice(9) !== req.files.image.name) {
        const uploadImage = req.files.image;
        const uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;
        uploadImage.mv(uploadPath, async () => {
            await Post.findByIdAndUpdate(req.params.id, {
                ...req.body,
                img: "/uploads/" + uploadImage.name
            });
        });
    } else {
        await Post.findByIdAndUpdate(req.params.id, {...req.body, img: post.img});
    }
    res.redirect("/#portfolio");
}

exports.deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    const deletedImagePath=__dirname+"/../public"+post.img;
    fs.unlinkSync(deletedImagePath);
    res.redirect("/#portfolio");
}
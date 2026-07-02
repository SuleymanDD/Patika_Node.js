const Post = require("../models/Post");


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ dateCreated: -1 });
        const page = parseInt(req.query.page) || 1;

        const limit = 6;
        const totalPosts = posts.length;
        const totalPages = Math.ceil(totalPosts / limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const showedPosts = posts.slice(startIndex, endIndex);

        res.render("index", { posts: showedPosts, currentPage: page, totalPages });
    } catch (error) {
        console.error("Veri çekme hatası:", error);
        res.status(500).send("Bir hata oluştu.");
    }
}


exports.createPost = async (req, res) => {
    await Post.create(req.body);
    res.redirect("/");
}

exports.updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect("/#portfolio");
}

const Post = require("../models/Post");

exports.getAddPage = (req, res) => {
    res.render("addPost");
}

exports.getEditPage = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("editPost", {post});
}
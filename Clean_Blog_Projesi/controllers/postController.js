const Post = require("../models/post");

exports.getAllPosts = async (req,res) => {
    const posts = await Post.find({}).sort("-dateCreated");
    res.render('index',{
        posts
    });
};

exports.createPost = async (req,res) => {
    await Post.create(req.body);
    res.redirect("/");
};

exports.updatePost = async (req,res) => {
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();

    res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req,res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
};
const Post = require("../models/post");

exports.getAbout = (req,res) => {
    res.render('about');
};

exports.getAddPost = (req,res) => {
    res.render('add_post');
};

exports.getPost = async (req,res) => {
    let post = await Post.findById(req.params.id);
    res.render("post", {
        post
    });
};

exports.getEdit = async (req,res) => {
    const post = await Post.findById(req.params.id);
    res.render("edit",{
        post
    });
};
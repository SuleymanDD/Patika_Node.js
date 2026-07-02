const Post = require("../models/Post");

exports.getAddPost = (req,res)=>{
    res.render("addPost");
}

exports.getEditPost = async (req,res)=>{
    const post= await Post.findById(req.params.id);
    res.render("editPost", {post});
}
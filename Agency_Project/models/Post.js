const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    desc: String,
    text: String,
    author: String,
    category: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model("Post", PostSchema);

module.exports=Post
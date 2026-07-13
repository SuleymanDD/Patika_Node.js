const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    shortdesc: {
        type: String,
        required: true
    },
    descripiton: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }, 
    dateCreated: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Course = mongoose.model("Course", CourseSchema);
module.exports= Course;
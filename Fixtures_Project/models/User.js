const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reserved: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'furniture'
    }]
})

const User = mongoose.model("User", UserSchema);

module.exports = User

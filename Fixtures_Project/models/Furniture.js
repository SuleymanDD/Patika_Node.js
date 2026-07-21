const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category'
    },
    reservedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const Furniture = mongoose.model("Furniture", FurnitureSchema);

module.exports = Furniture
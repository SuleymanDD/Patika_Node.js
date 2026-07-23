const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    furnitures: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'furniture'
    }]
})

const Category = mongoose.model("category", CategorySchema);

module.exports = Category

const mongoose = require("mongoose");
const { type } = require("node:os");
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});
module.exports = mongoose.model("Book", bookSchema);
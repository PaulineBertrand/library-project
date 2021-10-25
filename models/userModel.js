const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    wishlist: {
        type: Schema.Types.ObjectId,
        ref: "books"
    } 
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        enum: ["Novel", "Children Literature", "Comic", "Poetry", "Lifestyle", "Educational", "Non-fiction", "Other"],
        require: true
    },
    comment: String,
    image: {
        type: String,
        default: ""
    },
    owner: {
        type: Schema.Type.objectId,
        ref: "users"
    },
    status: {
        type: String,
        enum: ["available", "borrowed"]
    }, 
    borrower: {
        type: Schema.Type.objectId, // Je crois qu'on doit encore réfléchir à celui-là
        ref: "users"
    }
});

const bookSchema = mongoose.model("books", bookSchema)

module.exports = bookSchema
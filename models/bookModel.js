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
        default: "https://bit.ly/3Chl6ko"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: String,
        enum: ["available", "borrowed"],
        default: "available"
    }, 
    borrower: {
        type: Schema.Types.ObjectId, // Je crois qu'on doit encore réfléchir à celui-là
        ref: "users"
    }
});

const bookModel = mongoose.model("books", bookSchema)

module.exports = bookModel
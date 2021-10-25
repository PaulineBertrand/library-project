const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrowingSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "books"
    },
    borrower: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
})

const borrowingModel = mongoose.model("borrowings", borrowingSchema);

module.exports = borrowingModel
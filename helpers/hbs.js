const hbs = require("hbs");
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel")
const borrowingModel = require ("../models/borrowingModel")



hbs.registerHelper("isInWishlist", function (bookId){
    const wishlist = userModel.findById(req.session.currentUser._id).populate("wishlist");
    if (wishlist[0]._id === bookId) return true;
    return false;
})

hbs.registerHelper("isBorrowed", function (bookId) {
    bookModel.findById(bookId)
    .then((book) => {
        if (book.status === 'borrowed') {return true};
        return false;
    })
    .catch((err) => console.log("error while finding borrowed books in all books: ", err))
})
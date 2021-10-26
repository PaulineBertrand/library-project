const hbs = require("hbs");
const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel")
const borrowingModel = require ("../models/borrowingModel")



hbs.registerHelper("isInWishlist", function (bookId){
    const wishlist = userModel.findById(req.session.currentUser._id).populate("wishlist");
    if (wishlist[0]._id === bookId) return true;
    return false;
})
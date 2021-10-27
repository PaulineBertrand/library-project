const express = require("express");
const router = express.Router();
const bookModel = require("./../models/bookModel");
const userModel = require("./../models/userModel");
const borrowingModel = require("./../models/borrowingModel");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home/index", { title: "Express" });
});

// get the "how does it function" page
router.get("/about", function (req, res, next) {
  res.render("home/about");
});

// get the "all-books" page
router.get("/all-books", (req, res, next) => {
  const databaseRequests = [
    bookModel.find({ owner: { $ne: req.session.currentUser?._id } }),
    userModel.findById(req.session.currentUser?._id).populate("wishlist"),
    borrowingModel.find({borrower: req.session.currentUser?._id})
  ]
Promise.all(databaseRequests)
    .then((responses) => {
      const canStillBorrow = responses[2].length <= 5;
      res.render("all-books/all-books.hbs", { books: responses[0], user: responses[1], canStillBorrow, wishlist: true })
    })
    .catch((error) => console.error(error));
});

// get the "all-books" page, but filter only on the available
router.get("/all-books/available", (req, res, next) => {
  const databaseRequests = [
    bookModel.find({ $and: [ {status: "available"}, { owner : { $ne: req.session.currentUser?._id} }] }),
    userModel.findById(req.session.currentUser?._id).populate("wishlist"),
    borrowingModel.find({borrower: req.session.currentUser?._id})
  ]
  Promise.all(databaseRequests)
  .then((responses) => {
    const canStillBorrow = responses[2].length <= 5;
    res.render("all-books/all-books-available.hbs", { books: responses[0], user: responses[1], canStillBorrow, wishlist: true })})
    .catch((error) => console.error(error));
})

module.exports = router;

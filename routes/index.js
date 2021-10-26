const express = require("express");
const router = express.Router();
const bookModel = require("./../models/bookModel");
const userModel = require("./../models/userModel");
const borrowingModel = require("./../models/borrowingModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/all-books", (req, res, next) => {
  const databaseRequests = [
    bookModel.find({ owner: { $ne: req.session.currentUser._id } }),
    userModel.findById(req.session.currentUser._id).populate("wishlist")
  ]
Promise.all(databaseRequests)
    .then((responses) => res.render("all-books/all-books.hbs", { books: responses[0], user: responses[1] }))
    .catch((error) => console.error(error));
});

module.exports = router;

const express = require("express");
const bookModel = require("./../models/bookModel");
const userModel = require("./../models/userModel");
const borrowingModel = require("./../models/borrowingModel");

module.exports = function exposeToolBarNumbers(req, res, next) {
  const dbRequests = [
    bookModel.find({ owner: req.session.currentUser._id }),
    bookModel.find({
      $and: [{ owner: req.session.currentUser._id }, { status: "borrowed" }],
    }),
    borrowingModel.find({ borrower: req.session.currentUser._id }),
    userModel.findById(req.session.currentUser._id),
  ];
  Promise.all(dbRequests)
    .then((responses) => {
      const userStats = {
        nbAllBooks: responses[0].length,
        nbLendedBooks: responses[1].length,
        nbBorrowedBooks: responses[2].length,
        nbWishlistBooks: responses[3].wishlist.length,
      };
      res.locals.userNumbers = userStats;
      next();
    })
    .catch(next);
};

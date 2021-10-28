const express = require('express');
const router = express.Router();
const bookModel = require("./../../models/bookModel");
const userModel = require("./../../models/userModel")
const borrowingModel = require ("./../../models/borrowingModel");
const protectPrivateRoute = require("./../../middlewares/protectPrivateRoute")

// get the "all-books" page
router.get(["/", ""], (req, res, next) => {
  const databaseRequests = [
    bookModel.find({ owner: { $ne: req.session.currentUser?._id } }),
    userModel.findById(req.session.currentUser?._id).populate("wishlist"),
    borrowingModel.find({borrower: req.session.currentUser?._id})
  ]
Promise.all(databaseRequests)
    .then((responses) => {
      const canStillBorrow = responses[2].length <= 5;
      res.render("all-books/all-books.hbs", { books: responses[0], user: responses[1], wishlist: true, canStillBorrow, cssTitle: "all.books" })
    })
    .catch((error) => console.error(error));
});

// get the "all-books" page, but filter only on the available
router.get("/available", (req, res, next) => {
  const databaseRequests = [
    bookModel.find({ $and: [ {status: "available"}, { owner : { $ne: req.session.currentUser?._id} }] }),
    userModel.findById(req.session.currentUser?._id).populate("wishlist"),
    borrowingModel.find({borrower: req.session.currentUser?._id})
  ]
  Promise.all(databaseRequests)
  .then((responses) => {
    const canStillBorrow = responses[2].length <= 5;
    res.render("all-books/all-books-available.hbs", { books: responses[0], user: responses[1], canStillBorrow, wishlist: true, cssTitle: "all.books"})})
    .catch((error) => console.error(error));
})

// route qui affiche les détails d'un livre en particulier
router.get("/:id/details",protectPrivateRoute, (req, res, next) => {
    bookModel.findById(req.params.id).populate('owner')
    .then((book) => res.render("all-books/book-details.hbs", { book, cssTitle: "all.books"}))
    .catch((error) => console.error(error))
})


// route qui change le statut d'un livre à "borrowed"
router.post("/:id/borrow",protectPrivateRoute, (req, res, next) => {
bookModel.findByIdAndUpdate(req.params.id, {...req.body, status: "borrowed"}, { new: true })
.then((book) => {
    borrowingModel.create({book: book._id, borrower: req.session.currentUser._id}) 
    res.redirect("/all-books")
})
.catch((error) => console.error(error))
})

// route qui ajoute un livre donné à la wishlist de l'utilisateur
router.post("/:id/add-wishlist", protectPrivateRoute, (req, res, next) => {
    userModel.findByIdAndUpdate(req.session.currentUser._id, {$push:{wishlist: req.params.id}})
    .then ((book) => {
        res.redirect("/all-books")
    })
    .catch((error) => console.error(error))
})

// route qui retire un livre donné à la wishlist de l'utilisateur
router.post("/:id/remove-wishlist", protectPrivateRoute,(req, res, next) => {
    userModel.findByIdAndUpdate(req.session.currentUser._id, {$pull:{wishlist: req.params.id}})
    .then ((book) => {
        res.redirect("/all-books")
    })
    .catch((error) => console.error(error))
})



router.get("/filter", function (req, res, next) {

    const regexp = new RegExp(req.query.search, "ig");
    const databaseRequests = [
        bookModel.find({ $and: [{owner: { $ne: req.session.currentUser?._id }}, {$or: [{ title: { $regex: regexp } }, { author: { $regex: regexp } }]} ] }),
        userModel.findById(req.session.currentUser?._id).populate("wishlist"),
        borrowingModel.find({borrower: req.session.currentUser?._id})
      ]
    Promise.all(databaseRequests)
    .then((responses) => {
      const canStillBorrow = responses[2].length <= 5;
      res.render("all-books/all-books-filter.hbs", { books: responses[0], user: responses[1], canStillBorrow, wishlist: true, filter: req.query.search, cssTitle: "all.books" })
    })
    .catch((error) => console.error(error));
  });

  router.get("/available/filter", (req, res, next) => {
    const regexp = new RegExp(req.query.search, "ig");
    const databaseRequests = [
        bookModel.find({ $and: [{status: "available"}, {owner: { $ne: req.session.currentUser?._id }}, {$or: [{ title: { $regex: regexp } }, { author: { $regex: regexp } }]} ] }),
        userModel.findById(req.session.currentUser?._id).populate("wishlist"),
        borrowingModel.find({borrower: req.session.currentUser?._id})
      ]
    Promise.all(databaseRequests)
    .then((responses) => {
      const canStillBorrow = responses[2].length <= 5;
      res.render("all-books/all-books-filter.hbs", { books: responses[0], user: responses[1], canStillBorrow, wishlist: true, filter: req.query.search, cssTitle: "all.books" })
    })
    .catch((error) => console.error(error));
    
  })

module.exports = router;
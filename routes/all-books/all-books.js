const express = require('express');
const router = express.Router();
const bookModel = require("./../../models/bookModel");
const userModel = require("./../../models/userModel")
const borrowingModel = require ("./../../models/borrowingModel")


// route qui affiche les détails d'un livre en particulier
router.get("/:id/details", (req, res, next) => {
    bookModel.findById(req.params.id).populate('owner')
    .then((book) => res.render("all-books/book-details.hbs", { book}))
    .catch((error) => console.error(error))
})


router.get("/available", (req, res, next) => {
    bookModel.find({status: "available"})
    .then((books) => res.render("all-books/all-books-available.hbs", { books }))
    .catch((error) => console.error(error))
  })
  
// route qui change le statut d'un livre à "borrowed"
router.post("/:id/borrow", (req, res, next) => {
bookModel.findByIdAndUpdate(req.params.id, {...req.body, status: "borrowed"}, { new: true })
.then((book) => {
    borrowingModel.create({book: book._id, borrower: req.session.currentUser._id}) 
    res.redirect("/all-books/")
})
.catch((error) => console.error(error))
})

// route qui ajoute un livre donné à la wishlist de l'utilisateur
router.post("/:id/add-wishlist", (req, res, next) => {
    userModel.findByIdAndUpdate(req.session.currentUser._id, {$push:{wishlist: req.params.id}})
    .then ((book) => {
        res.redirect("/all-books/")
    })
    .catch((error) => console.error(error))
})

// route qui retire un livre donné à la wishlist de l'utilisateur
router.post("/:id/remove-wishlist", (req, res, next) => {
    userModel.findByIdAndUpdate(req.session.currentUser._id, {$pull:{wishlist: req.params.id}})
    .then ((book) => {
        res.redirect("/all-books/")
    })
    .catch((error) => console.error(error))
})

module.exports = router;
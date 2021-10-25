const express = require('express');
const router = express.Router();

// Requiring models and stuff
const bookModel = require("./../../models/bookModel")
const userModel = require("./../../models/userModel")
const borrowingModel = require("./../../models/borrowingModel")
const allGenres = bookModel.schema.path('genre').enumValues

// You can find below the routes for:
// 1 - all the books in one user's personnal library (get only)
// 2 - creating a book (get to render the form, post to create the book in the db)
// 3 - editing a book (get and post, like in 2-)
// 4 - deleting a book (post only - there is nothing to render)

// 1 - All books in the personal library
router.get('/:id/my-library', (req, res, next) => {
    console.log(req.params.id)
    bookModel.find({owner: req.params.id})
    .then((books) => {
        console.log("im in my-library with this data: ", books)
        res.render('dashboard/my-library', { books })
    })
    .catch((err) => console.log("error while displaying my-library: ", err))
});

// 2 - Creating a book

router.get('/:id/create-book', (req, res, next) => {
    res.render('dashboard/create-book.hbs', { allGenres, id: req.params.id })
})

router.post('/:id/create-book', (req, res, next) => {
    bookModel.create({...req.body, owner: req.params.id, image: req.body.image || undefined})
    .then(() => {
        res.redirect(`/dashboard/${req.params.id}/my-library`);
    })
    .catch((err) => console.log("error while creating a book: ", err))
})

// 3 - Editing a book

router.get('/:id/edit-book', (req, res, next) => {
    bookModel.find({_id: req.params.id})
    .then((book) => {
        res.render('dashboard/edit-book.hbs', { book })
    })
    .catch((err) => console.log('error while editing a book: ', err))
});



router.post('/:id/delete-book', (req, res, next) => {
    bookModel.findByIdAndDelete({_id: req.params.id})
    .then((book) => {
        res.redirect(`dashboard/${req.params.id}/my-library`);
        console.log('Book ', book, ' was successfully deleted');
    })
    .catch((err) => {
        console.log("error while deleting a book: ", err)
    })
})

module.exports = router;
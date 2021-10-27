const express = require('express');
const router = express.Router();

// Requiring models and stuff
const bookModel = require("./../../models/bookModel")
const userModel = require("./../../models/userModel")
const borrowingModel = require("./../../models/borrowingModel")
const allGenres = bookModel.schema.path('genre').enumValues;
const protectPrivateRoute = require("./../../middlewares/protectPrivateRoute")
const exposeToolBar = require("./../../middlewares/exposeToolBar")

// You can find below the routes for:
// 1 - all the books in one user's personnal library (get only)
// 2 - creating a book (get to render the form, post to create the book in the db)
// 3 - editing a book (get and post, like in 2-)
// 4 - deleting a book (post only - there is nothing to render)
// 5 - all the books borrowed by the user (get only, cause they can't change them)

// 1 - All books in the personal library
router.get('/my-library', protectPrivateRoute, exposeToolBar, (req, res, next) => {
    bookModel.find({owner: req.session.currentUser._id})
    .then((books) => {
        res.render('dashboard/my-library.hbs', { books, stats: res.locals.userNumbers })
    })
    .catch((err) => console.log("error while displaying my-library: ", err))
});

// 2 - Creating a book

router.get('/create-book', protectPrivateRoute, (req, res, next) => {
    res.render('dashboard/create-book.hbs', { allGenres, id: req.session.currentUser._id })
})

router.post('/create-book', protectPrivateRoute, (req, res, next) => {
    bookModel.create({...req.body, owner: req.session.currentUser._id, image: req.body.image || undefined})
    .then(() => {
        res.redirect(`/dashboard/my-library`);
    })
    .catch((err) => console.log("error while creating a book: ", err))
})

// 3 - Editing a book

router.get('/:id/edit-book', protectPrivateRoute, (req, res, next) => {
    bookModel.findById(req.params.id)
    .then((book) => {
        res.render('dashboard/edit-book.hbs', { book, allGenres })
    })
    .catch((err) => console.log('error while editing a book: ', err))
});

router.post('/:id/edit-book', protectPrivateRoute, (req, res, next) => {
    bookModel.findByIdAndUpdate({_id: req.params.id}, {...req.body, owner: req.session.currentUser._id, image: req.body.image || undefined})
    .then(() => res.redirect(`/dashboard/my-library`))
    .catch((err) => console.log('error while editing a book: ', err))
})

// 4 - Deleting a book
router.get('/:id/delete-book', protectPrivateRoute, (req, res, next) => {
    bookModel.findByIdAndDelete({_id: req.params.id})
    .then((book) => {
        res.redirect('/dashboard/my-library');
        console.log('Book ', book.title, ' was successfully deleted');
    })
    .catch((err) => {
        console.log("error while deleting a book: ", err)
    })
})

// 5 - Displaying borrowed books

router.get('/my-borrowed-books',  protectPrivateRoute, exposeToolBar, (req, res, next) => {
    borrowingModel.find({borrower: req.session.currentUser._id}).populate("book")
    .then((borrowings) => {
        res.render('dashboard/borrowed.hbs', { borrowings, stats: res.locals.userNumbers })
    })
    .catch((err) => console.log('error while displaying borrowed books: ', err))
})


router.get("/lended-library", protectPrivateRoute, (req, res, next) => {
    bookModel.find({ $and: [ {status: "borrowed"}, { owner : { $eq: req.session.currentUser._id,} }] })
    .then((books) => res.render("dashboard/lended-library", { books }))
    .catch((error) => console.error(error))
  })



module.exports = router;
const express = require('express');
const router = express.Router();

// Requiring models and stuff
const bookModel = require("./../../models/bookModel")
const userModel = require("./../../models/userModel")
const borrowingModel = require("./../../models/borrowingModel")
const allGenres = bookModel.schema.path('genre').enumValues;
const protectPrivateRoute = require("./../../middlewares/protectPrivateRoute")
const exposeToolBar = require("./../../middlewares/exposeToolBar");
const fileUploader = require("./../../config/cloudinary.config");
const findCoverImage = require("../../middlewares/bookCovers.js");

// These functions are used to format the strings for title and author

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

function capitalizeEachWord(sentence) {
    return sentence.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
}

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
        res.render('dashboard/my-library.hbs', { books, stats: res.locals.userNumbers, cssTitle: 'library' })
    })
    .catch((err) => console.log("error while displaying my-library: ", err))
});

// 2 - Creating a book

router.get('/create-book', protectPrivateRoute,  (req, res, next) => {
    res.render('dashboard/create-book.hbs', { allGenres, id: req.session.currentUser._id, cssTitle: 'form' })
})

router.post('/create-book', protectPrivateRoute, fileUploader.single('image'), findCoverImage, (req, res, next) => {

    const newBook= { ...req.body };

    // This handles the new book image: if the user uploaded an image, we use it,
    // otherwise we look on openlibrary for a cover, and if we can't find one, we
    // use our default picture
    if (req.file) {
        newBook.image = req.file.path;
    } else if (res.locals.coverURL) {
        newBook.image = res.locals.coverURL
    } else {
        newBook.image = undefined
    }

    // The book owner is the one creating the book
    newBook.owner = req.session.currentUser._id 

    // We format the title and the author in case the user didnt use proper case conventions

    newBook.title = capitalizeEachWord(req.body.title);
    newBook.author = capitalizeEachWord(req.body.author);

    // And we can now create the book!    
    bookModel.create(newBook)
    
    .then(() => {
        res.redirect(`/dashboard/my-library`);
    })
    .catch((err) => console.log("error while creating a book: ", err))
})



// 3 - Editing a book

router.get('/:id/edit-book', protectPrivateRoute, (req, res, next) => {
    bookModel.findById(req.params.id)
    .then((book) => {
        res.render('dashboard/edit-book.hbs', { book, allGenres, cssTitle: 'form' })
    })
    .catch((err) => console.log('error while editing a book: ', err))
});

router.post('/:id/edit-book', protectPrivateRoute, fileUploader.single('image'), (req, res, next) => {
    const newBook= { ...req.body };
    if (req.file) {
        console.log("im there lol")
        newBook.image = req.file.path;
    } else {
        newBook.image = undefined;
    }
    newBook.owner = req.session.currentUser._id 
    bookModel.findByIdAndUpdate(req.params.id, newBook)
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
        res.render('dashboard/borrowed.hbs', { borrowings, stats: res.locals.userNumbers, cssTitle: 'library' })
    })
    .catch((err) => console.log('error while displaying borrowed books: ', err))
})


router.get("/lended-library", protectPrivateRoute, exposeToolBar, (req, res, next) => {
    bookModel.find({ $and: [ {status: "borrowed"}, { owner : { $eq: req.session.currentUser._id,} }] })
    .then((books) => res.render("dashboard/lended-library", { books, stats: res.locals.userNumbers, cssTitle: 'library'  }))
    .catch((error) => console.error(error))
  })

  // route qui change le statut d'un livre à "available"
router.post("/:id/available",protectPrivateRoute, exposeToolBar, (req, res, next) => {
    bookModel.findByIdAndUpdate(req.params.id, {...req.body, status: "available"}, { new: true })
    .then((book) => {
        console.log('book id', book._id);
        const mybookid= book._id.toString()
        borrowingModel.findOneAndDelete({ book: mybookid});
        res.redirect("/dashboard/lended-library")
    })
    .catch((error) => console.error(error))
    })


module.exports = router;
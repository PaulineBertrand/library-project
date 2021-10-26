const express = require('express');
const router = express.Router();
const bookModel = require("./../models/bookModel")
const userModel = require("./../models/userModel")
const borrowingModel = require ("./../models/borrowingModel")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/all-books", (req, res, next) => {
  bookModel.find( { owner : { $ne: req.session.currentUser._id,} })
  .then((books) => res.render("all-books/all-books.hbs", { books }))
  .catch((error) => console.error(error))
})

module.exports = router;

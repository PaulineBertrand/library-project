const express = require('express');
const router = express.Router();
const userModel = require("./../../models/userModel");
const bookModel = require("./../../models/bookModel")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard/navigation');
});



router.get('/lended', function(req, res, next){

  userModel.findById(req.session.currentUser.id)
  
  .then((user) => res.render("dashboard/lended", { user }))
  .catch(next);
})

router.get('/borrowed', function(req, res, next){

  userModel.findById(req.session.currentUser.id)
  
  .then((user) => res.render("dashboard/borrowed", { user }))
  .catch(next);
})

// router.get('/wishlist', function(req, res, next){

//   userModel.findById(req.session.currentUser.id)
  
//   .then((user) => res.render("dashboard/wishlist", { user }))
//   .catch(next);
// })





module.exports = router;

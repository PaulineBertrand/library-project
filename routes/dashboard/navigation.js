const express = require('express');
const router = express.Router();
const userModel = require("./../../models/userModel");
const bookModel = require("./../../models/bookModel");
const borrowingModel = require("./../../models/borrowingModel");
const protectPrivateRoute = require("./../../middlewares/protectPrivateRoute")
const exposeToolBar = require("./../../middlewares/exposeToolBar")
const fileUploader = require("./../../config/cloudinary.config");

// getting all the user numbers (how many books in total etc), displaying them in the dashboard
router.get('/', protectPrivateRoute, exposeToolBar,(req, res, next) => {
 
    res.render('dashboard/navigation', {stats: res.locals.userNumbers})
 
});


router.get('/lended', protectPrivateRoute, function(req, res, next){

  userModel.findById(req.session.currentUser.id)
  
  .then((user) => res.render("dashboard/lended", { user }))
  .catch(next);
})


module.exports = router;

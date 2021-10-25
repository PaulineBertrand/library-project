const express = require('express');
const router = express.Router();
const userModel = require("./../../models/userModel");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard/navigation');
});

router.get('/my-library', function(req, res, next){

  userModel.findById(req.session.id)
  
  .then((user) => res.render("dashboard/my-library", { user }))
  .catch(next);
 

})





module.exports = router;

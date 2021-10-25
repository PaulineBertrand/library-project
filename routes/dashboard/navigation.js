const express = require('express');
const router = express.Router();
const userModel = require("./../../models/userModel");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard/navigation');
});






module.exports = router;

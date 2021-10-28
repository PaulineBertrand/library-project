const express = require("express");
const router = express.Router();
const bookModel = require("./../models/bookModel");
const userModel = require("./../models/userModel");
const borrowingModel = require("./../models/borrowingModel");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home/index", { cssTitle: "home" });
});

// get the "how does it function" page
router.get("/about", function (req, res, next) {
  res.render("home/about");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bookModel = require("./../../models/bookModel");
const userModel = require("./../../models/userModel");
const borrowingModel = require("./../../models/borrowingModel");
const { path } = require("../../app");

router.get("/wishlist", async (req, res, next) => {
  try {
    const user = await userModel
      .findById(req.session.currentUser._id)
      .populate({
          path: "wishlist",
          populate: {
              path: 'owner'
          }
      });

    console.log("user ?", user);

    res.render("dashboard/wishlist", { user });

  } catch (err) {
    next(err);
  }
});

module.exports = router;

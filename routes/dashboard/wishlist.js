const express = require("express");
const router = express.Router();
const bookModel = require("./../../models/bookModel");
const userModel = require("./../../models/userModel");
const borrowingModel = require("./../../models/borrowingModel");
const { path } = require("../../app");
const protectPrivateRoute = require("./../../middlewares/protectPrivateRoute")
const exposeToolBar = require("./../../middlewares/exposeToolBar")

// List all the list of the wishlist that we selected in all books
router.get("/wishlist", protectPrivateRoute, exposeToolBar, async (req, res, next) => {
  try {
    const user = await userModel
      .findById(req.session.currentUser._id)
      .populate({
          path: "wishlist",
          populate: {
              path: 'owner'
          }
      });
      console.log(res.locals.userNumbers)
    res.render("dashboard/wishlist", { user, stats: res.locals.userNumbers });

  } catch (err) {
    next(err);
  }
});

// Button to delete the element from  the wishlist 

router.post("/:id/remove-wishlist", protectPrivateRoute, (req, res, next) => {
    userModel.findByIdAndUpdate(req.session.currentUser._id, {$pull:{wishlist: req.params.id}})
    .then (() => {
        res.redirect("/dashboard/wishlist")
    })
    .catch((error) => console.error(error))
})

module.exports = router;

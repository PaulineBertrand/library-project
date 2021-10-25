const express = require('express');
const router = express.Router();
const bookModel = require("./../../models/bookModel")
const userModel = require("./../../models/userModel")
const borrowingModel = require("./../../models/borrowingModel")

router.get('/:id/my-wishlist', (req, res, next) => {
    
    userModel.findById(req.params.id).populate("wishlist")
      .then((wishlist) => res.render("dashboard/wishlist.hbs", { wishlist }))
      .catch(next);    
  });

  router.post("/:id/remove-wishlist", (req, res, next) => {
    userModel.findByIdAndUpdate(req.session.currentUser._id, {$pull:{wishlist: req.params.id}})
    .then ((book) => {
        res.redirect("/all-books/")
    })
    .catch((error) => console.error(error))
})



module.exports = router;
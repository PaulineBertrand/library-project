const bookModel = require("./../../models/bookModel");
const userModel = require("./../../models/userModel")
const borrowingModel = require ("./../../models/borrowingModel")




function renderAddToWishlistButton() {
    const wishlist = userModel.findById(req.session.currentUser._id).populate("wishlist");
    // Iteration 1: set the visibility of `<section class="green-pepper">`
    document.querySelectorAll('.add-wishlist').forEach((addButton) => {
        if ( !isInWishList(addButton.id)) {
            addButton.style.visibility = 'visible';
        }
      
    });
  }

  function renderRemoveFromWishlistButton() {
    const wishlist = userModel.findById(req.session.currentUser._id).populate("wishlist");
    // Iteration 1: set the visibility of `<section class="green-pepper">`
    document.querySelectorAll('.remove-wishlist').forEach((removeButton) => {
        if ( isInWishList(removeButton.id)) {
            removeButton.style.visibility = 'visible';
        }
      
    });
  }
 

  function isInWishList (bookId) {
      for (let i=0; i<wishlist.length; i++) {
          if (wishlist[0]._id === bookId) return true;
      }
      return false;
  }
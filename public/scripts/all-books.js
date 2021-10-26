//         addButton.style.visibility = 'visible';
      
//     });
//   }
const borrowButtons = document.querySelectorAll(".borrow-button")
borrowButtons.forEach((borrowButton) => {
    borrowButton.addEventListener('click', () => {
        borrowButton.classList.remove("active")
    })
})

const bookModel = require("./../../models/bookModel");
const borrowingModel = require ("./../../models/borrowingModel")


function renderAddToWishlistButton() {
    const wishlist = userModel.findById(req.session.currentUser._id).populate("wishlist");
    document.querySelectorAll('.add-wishlist').forEach((addButton) => {
        if ( !isInWishList(addButton.id)) {
            addButton.style.visibility = 'visible';
        } else {
            addButton.style.visibility = 'hidden';
        }
      
    });
  }

  function renderRemoveFromWishlistButton() {
    const wishlist = userModel.findById(req.session.currentUser._id).populate("wishlist");
    document.querySelectorAll('.remove-wishlist').forEach((removeButton) => {
        if ( isInWishList(removeButton.id)) {
            removeButton.style.visibility = 'visible';
        } else {
            removeButton.style.visibility = 'hidden';
        }
      
    });
  }
 

  function isInWishList (bookId) {
      for (let i=0; i<wishlist.length; i++) {
          if (wishlist[0]._id === bookId) return true;
      }
      return false;
  }

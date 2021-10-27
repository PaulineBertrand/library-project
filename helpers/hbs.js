const hbs = require("hbs");
const bookModel = require("./../models/bookModel");
const userModel = require("./../models/userModel");
const borrowingModel = require("./../models/borrowingModel");


// checks if a given book is in the wishlist of the user. If it is in the wishlist, only the "remove from wishlist" button appears. If it is not in the wishlist, only the "add to wishlist" appears.
hbs.registerHelper("isInWishlist", function (user, options) {
  for (let i = 0; i < user.wishlist.length; i++) {
    if (user.wishlist[i]._id.toString() === this._id.toString())
    return `<form action="/all-books/${this._id.toString()}/remove-wishlist" method="post" class="remove-wishlist"><button type="submit"> <i class="fas fa-heart"></i>
    </button></form>`
  }
  return `<form action="/all-books/${this._id.toString()}/add-wishlist"  method="post" class="add-wishlist"><button type="submit"> <i class="far fa-heart"></i></button></form>`;
});

// checks if 2 parameters are equal. If yes, this function returns the 3rd parameter
hbs.registerHelper("ifEquals", function (x, y, thingToDisplay) {
  if (x === y) return thingToDisplay
});

// depending on the number of books of the library, return the good text
hbs.registerHelper("isEqual", function (nbAllBooks, nbLendedBooks) {
  if (nbAllBooks === 1) 
  return `<p>You have ${nbAllBooks} book, among which ${nbLendedBooks} currently lent.</p>`;
  if (nbAllBooks > 1)
  return `<p>You have ${nbAllBooks} books, among which ${nbLendedBooks} currently lent.</p>`
});

// depending on the number of books in the wishlist, return the good text
hbs.registerHelper("isEqualWishlist", function (nbWishlistBooks) {
  if (nbWishlistBooks === 1) 
  return `<p>You have ${nbWishlistBooks} book in your wishlist.</p>`;
  if (nbWishlistBooks > 1)
  return `   <p>You have ${nbWishlistBooks} books in your wishlist.</p>`
});

// depending on the number of books in the borrowed books, return the good text
hbs.registerHelper("isEqualBorrowed", function (nbBorrowedBooks) {
  if (nbBorrowedBooks === 1) 
  return `<p>You are borrowing ${nbBorrowedBooks} book.</p>`;
  if (nbBorrowedBooks > 1)
  return `<p>You are borrowing ${nbBorrowedBooks} books.</p>`
});

const hbs = require("hbs");
const bookModel = require("./../models/bookModel");
const userModel = require("./../models/userModel");
const borrowingModel = require("./../models/borrowingModel");

hbs.registerHelper("isInWishlist", function (user, options) {
  for (let i = 0; i < user.wishlist.length; i++) {
    if (user.wishlist[i]._id.toString() === this._id.toString())
    return `<form action="/all-books/${this._id.toString()}/remove-wishlist" method="post" class="remove-wishlist"><button type="submit"> <i class="fas fa-heart"></i>
    </button></form>`
  }
 
  return `<form action="/all-books/${this._id.toString()}/add-wishlist"  method="post" class="add-wishlist"><button type="submit"> <i class="far fa-heart"></i></button></form>`;
});


hbs.registerHelper("ifEquals", function (x, y, thingToDisplay) {
  if (x === y) return thingToDisplay
});

hbs.registerHelper("isEqual", function (nbAllBooks, nbLendedBooks) {
  if (nbAllBooks === 1) 
  return `<p>You have ${nbAllBooks} book, among which ${nbLendedBooks} currently lended.</p>`;
  if (nbAllBooks > 1)
  return `<p>You have ${nbAllBooks} books, among which ${nbLendedBooks} currently lended.</p>`
});

hbs.registerHelper("isEqualWishlist", function (nbWishlistBooks) {
  if (nbWishlistBooks === 1) 
  return `<p>You have ${nbWishlistBooks} book in your wishlist.</p>`;
  if (nbWishlistBooks > 1)
  return `   <p>You have ${nbWishlistBooks} books in your wishlist.</p>`
});

hbs.registerHelper("isEqualBorrowed", function (nbBorrowedBooks) {
  if (nbBorrowedBooks === 1) 
  return `<p>You are borrowing ${nbBorrowedBooks} book.</p>`;
  if (nbBorrowedBooks > 1)
  return `<p>You are borrowing ${nbBorrowedBooks} books.</p>`
});

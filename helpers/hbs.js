const hbs = require("hbs");
const bookModel = require("./../models/bookModel");
const userModel = require("./../models/userModel");
const borrowingModel = require("./../models/borrowingModel");

hbs.registerHelper("isInWishlist", function (user, options) {
  console.log("user", user);
  // console.log("this", this._id.toString()); // l'id du book
  // console.log("hello", user.wishlist[0])
  for (let i = 0; i < user.wishlist.length; i++) {
    if (user.wishlist[i]._id.toString() === this._id.toString())
    return `<form action="/all-books/${this._id.toString()}/remove-wishlist" method="post" class="remove-wishlist"><button type="submit"> <i class="fas fa-heart"></i>
    </button></form>`
  }
 
  return `<form action="/all-books/${this._id.toString()}/add-wishlist"  method="post" class="add-wishlist"><button type="submit"> <i class="far fa-heart"></i></button></form>`;
});


hbs.registerHelper("isBorrowed", function (bookId) {
  bookModel
    .findById(bookId)
    .then((book) => {
      if (book.status === "borrowed") {
        return true;
      }
      return false;
    })
    .catch((err) =>
      console.log("error while finding borrowed books in all books: ", err)
    );
});

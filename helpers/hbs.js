const hbs = require("hbs");
const bookModel = require("./../models/bookModel");
const userModel = require("./../models/userModel");
const borrowingModel = require("./../models/borrowingModel");

hbs.registerHelper("isInWishlist", async function (userId, options) {
  console.log(options.fn);
  console.log("this", this._id); // l'id du book
  const user = await userModel.findById(userId).populate("wishlist");
  const found = [1, 2, 3].find((el) => {
    // console.log("-------->");
    // const a = el._id.toString();
    // const b = this._id.toString();
    return el === userId;
  });
  console.log(found);
  if (found) {
    return    `<form action="/all-books/${this._id}/add-wishlist"  method="post" class="add-wishlist">
    <button type="submit"> Add to wishlist</button>
  </form>`
  } 
  // if (wishlist[0]._id === bookId) return true;
  // return false;
});

module.exports = function exposeToolBar(req, res, next) {
    console.log(req.session.currentUser._id)
    const dbRequests = [
      bookModel.find({owner: req.session.currentUser._id}),
      bookModel.find({$and : [{owner: req.session.currentUser._id}, {status: 'borrowed'}]}),
      borrowingModel.find({borrower: req.session.currentUser._id}),
      userModel.findById(req.session.currentUser._id)
    ]
    Promise.all(dbRequests)
    .then((responses) => {
      console.log(responses)
      console.log('the current user is', responses[3]);
      const userStats = {
        nbAllBooks: responses[0].length,
        nbLendedBooks: responses[1].length,
        nbBorrowedBooks: responses[2].length,
        nbWishlistBooks: responses[3].wishlist.length
      }
      res.render('partials/toolbar', userStats)
    })
    .catch((err) => console.log(err))
  }
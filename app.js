const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const logger = require("morgan");
const hbs = require("hbs");
require("./config/mongodb");
require("./helpers/hbs"); // custom functions adding features to hbs templates
const session = require("express-session");

const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// added this setup for partials
hbs.registerPartials(path.join(__dirname , "views" , "partials"));

const indexRouter = require("./routes/index");
const allBooksRouter = require("./routes/all-books/all-books");
const authRouter = require("./routes/auth");
const navigationRouter = require("./routes/dashboard/navigation");
const libraryRouter = require("./routes/dashboard/library");
const wishlistRouter = require("./routes/dashboard/wishlist");



// initialize session
app.use(
  session({
    secret: "ASecretStringThatSouldBeHARDTOGUESS/CRACK",
    saveUninitialized: true,
    resave: true,
  })
);



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const dev_mode = false;

if (dev_mode === true) {
  app.use(function exposeTestUser(req, res, next) {

    req.session.currentUser = {
      _id: "6177ba37a6d77182f51c0b31",
    };
    next();
  });
}

// FLASH MESSAGES
// enable "flash messaging" system
// flash relies on the express-session mechanism
app.use(flash());
app.use(require("./middlewares/exposeLoginStatus"));
app.use(require("./middlewares/exposeFlashMessage"));



app.use("/", indexRouter);
// Here I am prefixing the routes in the two routes files all-books.js and dashboard.js but we can change that
app.use("/all-books", allBooksRouter);
app.use("/auth", authRouter);
app.use("/dashboard", navigationRouter);
app.use("/dashboard", libraryRouter);
app.use("/dashboard", wishlistRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// CUSTOM MIDDLEWARES
// matrix cookie scene : https://www.youtube.com/watch?v=nvaE_HCMimQ
// the web is a mess : https://www.youtube.com/watch?v=OFRjZtYs3wY
app.use(require("./middlewares/exposeToolBar"));
app.use(function myCookieLogger(req, res, next) {
  console.log(req.cookies);
  next();
});



module.exports = app;

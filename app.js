const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require("connect-flash");
const logger = require('morgan');
const hbs = require("hbs");
require("./config/mongodb");
const session = require("express-session");


const indexRouter = require('./routes/index');
const allBooksRouter = require('./routes/all-books/all-books');
const authRouter = require("./routes/auth");
const navigationRouter = require ('./routes/dashboard/navigation');
const borrowedRouter = require ('./routes/dashboard/borrowed');
const libraryRouter = require ('./routes/dashboard/library');
const  wishlistRouter = require ('./routes/dashboard/wishlist');


const app = express();

// initialize session
app.use(
  session({
    secret: "ASecretStringThatSouldBeHARDTOGUESS/CRACK",
    saveUninitialized: true,
    resave: true,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// added this setup for partials
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// FLASH MESSAGES
// enable "flash messaging" system
// flash relies on the express-session mechanism
app.use(flash());
app.use(require("./middlewares/exposeLoginStatus"));

app.use('/', indexRouter);
// Here I am prefixing the routes in the two routes files all-books.js and dashboard.js but we can change that
app.use('/all-books', allBooksRouter);
app.use('/auth', authRouter)
app.use('/dashboard',navigationRouter);
app.use('/dashboard',borrowedRouter);
app.use('/dashboard',libraryRouter);
app.use('/dashboard',wishlistRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





// CUSTOM MIDDLEWARES
// matrix cookie scene : https://www.youtube.com/watch?v=nvaE_HCMimQ
// the web is a mess : https://www.youtube.com/watch?v=OFRjZtYs3wY
app.use(function myCookieLogger(req, res, next) {
  console.log(req.cookies);
  next();
});


app.use(require("./middlewares/exposeFlashMessage"));
app.use(require("./middlewares/exposeLoginStatus"));

module.exports = app;

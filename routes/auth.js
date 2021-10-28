const express = require("express");
const router = express.Router();
const User = require("./../models/userModel");
const bcrypt = require("bcrypt"); // lib to encrypt data
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute")


let msg = null;


router.get("/signin", (req, res, next) => {
  res.render("auth/signin", {cssTitle : "auth"});
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", {cssTitle : "auth"});
});

router.get("/signout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/auth/signin");
  });
});

router.post("/signin",  async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      //   Display an error message telling the user that either the password
      // or the email is wrong
      req.flash("error", "Invalid credentials");
      res.redirect("/auth/signin");
    } else {
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        // Display an error message telling the user that either the password
        // or the email is wrong
        req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin");
      } else {
        // everything is fine so :
        // Authenticate the user...
        const userObject = foundUser.toObject(); // needed to convert mongoose object to classic js object
        delete userObject.password; // remove password before saving user in session
        req.session.currentUser = userObject;
        req.flash("success", "Successfully logged in...");
        res.redirect(`/dashboard`);
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body }; // clone req.body with spread operator
    const foundUser = await User.findOne({ email: newUser.email });

    if (foundUser) {
      req.flash("warning", "Email already registered");
      res.redirect("/auth/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await User.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/auth/signin");
    }
  } catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    req.flash("error", errorMessage);
    res.redirect("/auth/signup");
  }
});

module.exports = router;

require("dotenv").config();
require("./../config/mongodb");
require("mongoose");
const bookModel = require("./../models/bookModel")
const userModel = require("./../models/userModel")
const borrowingModel = require ("./../models/borrowingModel")


const borrowings = [{}, {}, {}];


  (async function insertOwners() {
    try {
      await borrowingModel.deleteMany(); // empty the album db collection
  
      const borrowers = await Promise.all([
        userModel.findOne({ email: "david@dav.id" }),
        userModel.findOne({ email: "mar@ie.po" }),
        userModel.findOne({ email: "ber@trand.po" }),
      ]);

      const books = await Promise.all([
        bookModel.findOne({ title: "Le Baron Perché" }),  
        bookModel.findOne({ title: "Tintin au Congo" }),  
        bookModel.findOne({ title: "La Peste" }),  
      ]);

  
     borrowings[0].borrower = borrowers[2];
     borrowings[1].borrower = borrowers[0];
     borrowings[2].borrower = borrowers[1];
     borrowings[0].book = books[0];
     borrowings[1].book = books[1];
     borrowings[2].book = books[2];


  
      const inserted = await borrowingModel.insertMany(borrowings); // insert docs in db
      console.log(`seed borrowings done : ${inserted.length} documents inserted !`);
    } catch (err) {
      console.error(err);
    }
  })();
require("dotenv").config();
require("./../config/mongodb");
require("mongoose");
const bookModel = require("./../models/bookModel")
const userModel = require("./../models/userModel")


const books = [
    {title: "Le Baron Perché",
    author: "Italo Calvino",
    genre: "Novel",
    comment: "Nice read but sad lol",
    status: "borrowed",
   
    },
    {title: "Tintin au Congo",
    author: "Hergé",
    genre:"Comic",
    comment: "fun, nice to read", 
    status: "available",
    
    },
    {title:"La Peste",
    author: "Albert Camus",
    genre: "Novel",
    comment: "a classic !",
    status: "borrowed",
    },
    {title: "Matilda",
    author: "Roald Dahl",
    genre: "Children Literature",
    comment: "another classic !",
   
    },
    {title: "Matilda",
    author: "Roald Dahl",
    genre: "Children Literature",
    comment: "another classic !",
    },
    {title: "Alcools",
    author: "Guillaume Apollinaire",
    genre: "Poetry",
    comment: "nice ",
    },
    {title: "Harry Potter à l'Ecole des Sorciers",
    author: "J.K. Rowling",
    genre: "Children Literature",
    comment: "wow ",

    }

];


  (async function insertOwners() {
    try {
      await bookModel.deleteMany(); // empty the album db collection
  
      const owners = await Promise.all([
        userModel.findOne({ email: "david@dav.id" }),
        userModel.findOne({ email: "mar@ie.po" }),
        userModel.findOne({ email: "ber@trand.po" }),
      ]);
  
      books[0].owner = owners[0];
      books[1].owner = owners[1];
      books[2].owner = owners[2];
      books[3].owner = owners[0];
      books[4].owner = owners[1];
      books[5].owner = owners[2];
      books[6].owner = owners[0];


  
      const inserted = await bookModel.insertMany(books); // insert docs in db
      console.log(`seed books done : ${inserted.length} documents inserted !`);
    } catch (err) {
      console.error(err);
    }
  })();
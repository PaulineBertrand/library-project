require("dotenv").config();
require("./../config/mongodb");
const bookModel = require("./../models/bookModel")
const userModel = require("./../models/userModel")


const books = [
    {title: "Le Baron Perché",
    author: "Italo Calvino",
    genre: "Novel",
    comment: "Nice read but sad lol",
    owner: ObjectId("61766c71854c201c48bfad3b"),
    status: "available",
    borrower: ObjectId("61766c71854c201c48bfad39")
    },
    {title: "",
    author: "",
    genre:,
    comment:,
    image:,
    owner:,
    status:,
    borrower:
    },
    {title:,
    author:,
    genre:,
    comment:,
    image:,
    owner:,
    status:,
    borrower:
    },
    {title:,
    author:,
    genre:,
    comment:,
    image:,
    owner:,
    status:,
    borrower:
    }
]
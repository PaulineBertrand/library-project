require("dotenv").config();
require("./../config/mongodb");
const bookModel = require("./../models/bookModel")
const userModel = require("./../models/userModel")

const users = [
    {name:"David",
    lastname: "Lancheros",
    email: "david@dav.id",
    password:"1234",
    },
    {name:"Marie",
    lastname: "Popoff",
    email: "mar@ie.po",
    password:"1234",
    },
    {name:"Po",
    lastname: "Bertrand",
    email: "ber@trand.po",
    password:"123",
    },
    {name:"Toto",
    lastname: "Bar",
    email: "foo@baz.foo",
    password:"bar",
    }
];


userModel
  .deleteMany()
  .then(() => {
    userModel.insertMany(users).then((ok) => console.log("ok"));
  })
  .catch((err) => console.log("err", err));
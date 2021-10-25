
require("./../config/mongodb");
const bookModel = require("./../models/bookModel")
const userModel = require("./../models/userModel")
const bcrypt = require("bcrypt"); // lib to encrypt data

const users = [
    {name:"David",
    lastname: "Lancheros",
    email: "david@dav.id",
    password: bcrypt.hashSync("1234", 10),
    },
    {name:"Marie",
    lastname: "Popoff",
    email: "mar@ie.po",
    password:bcrypt.hashSync("1234", 10),
    },
    {name:"Po",
    lastname: "Bertrand",
    email: "ber@trand.po",
    password:bcrypt.hashSync("1234", 10),
    },
    {name:"Toto",
    lastname: "Bar",
    email: "foo@baz.foo",
    password:bcrypt.hashSync("1234", 10),
    }
];


userModel
  .deleteMany()
  .then(() => {
    userModel.insertMany(users).then((ok) => console.log("ok"));
  })
  .catch((err) => console.log("err", err));